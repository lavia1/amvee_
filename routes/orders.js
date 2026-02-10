const express = require('express');
const router = express.Router();
const pool = require('../db'); // pg Pool
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// POST /api/orders - Create a new order
router.post('/', async (req, res) => {
  const {
    session_id,
    first_name,
    last_name,
    email,
    phone_number,
    country,
    street_address,
    city,
    postal_code,
    region,
    items,
    shipping_method
  } = req.body;

  try {
    // Validation
    if (!['pickup', 'delivery'].includes(shipping_method)) {
      return res.status(400).json({ error: "Invalid shipping method" });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "Order must have at least one item" });
    }

    // Extract UUIDs
    const partIds = items.map(item => item.part_id);

    // Fetch parts from database
    const fetchPartsQuery = `SELECT id, price, stock FROM parts WHERE id = ANY($1)`;
    const partsResult = await pool.query(fetchPartsQuery, [partIds]);

    const partPriceMap = {};
    const partStockMap = {};
    partsResult.rows.forEach(part => {
      partPriceMap[part.id] = parseFloat(part.price);
      partStockMap[part.id] = parseInt(part.stock, 10);
    });

    // Validate items & calculate total
    let totalPrice = 0;
    const orderItemsValues = [];
    const stockUpdates = [];

    for (const item of items) {
      if (!partPriceMap[item.part_id]) {
        return res.status(400).json({ error: `Invalid part_id: ${item.part_id}` });
      }

      const price = partPriceMap[item.part_id];
      const stock = partStockMap[item.part_id];

      if (stock < item.quantity) {
        return res.status(400).json({ error: `Not enough stock for part_id: ${item.part_id}` });
      }

      totalPrice += price * item.quantity;
      orderItemsValues.push([item.part_id, item.quantity, price]);
      stockUpdates.push({ part_id: item.part_id, new_stock: stock - item.quantity });
    }

    const shippingCost = shipping_method === 'pickup' ? 0.0 : 10.0;
    const grandTotal = totalPrice + shippingCost;

    // DEBUG
    console.log("Order total:", totalPrice, "Shipping:", shippingCost, "Grand total:", grandTotal);
    console.log("Order items:", orderItemsValues);
    console.log("Stock updates:", stockUpdates);

    // Transaction
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Insert order
      const orderQuery = `
        INSERT INTO orders (
          session_id, first_name, last_name, email, phone_number,
          total_price, shipping_cost, grand_total, shipping_method,
          country, street_address, city, postal_code, region, status
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,'pending')
        RETURNING id
      `;
      const orderResult = await client.query(orderQuery, [
        session_id,
        first_name,
        last_name,
        email,
        phone_number,
        totalPrice,
        shippingCost,
        grandTotal,
        shipping_method,
        country,
        street_address,
        city,
        postal_code,
        region
      ]);

      const orderId = orderResult.rows[0].id;

      // Insert order items
      const orderItemsQuery = `
        INSERT INTO order_items (order_id, part_id, quantity, price)
        VALUES ($1, $2, $3, $4)
      `;
      for (const item of orderItemsValues) {
        await client.query(orderItemsQuery, [orderId, ...item]);
      }

      // Update stock in parts table
      const stockUpdateQuery = 'UPDATE parts SET stock = $1 WHERE id = $2';
      for (const { part_id, new_stock } of stockUpdates) {
        await client.query(stockUpdateQuery, [new_stock, part_id]);
      }

      await client.query('COMMIT');

      // Respond
      return res.json({
        success: true,
        message: "Tilaus tehty",
        orderId,
        total_price: totalPrice,
        shipping_cost: shippingCost,
        grand_total: grandTotal,
        shipping_method
      });

    } catch (err) {
      await client.query('ROLLBACK');
      console.error("Transaction error:", err.message, err.stack);
      return res.status(500).json({ error: "Failed to create order", details: err.message });
    } finally {
      client.release();
    }

  } catch (err) {
    console.error("Error creating order:", err.message, err.stack);
    return res.status(500).json({ error: "Database error while fetching parts", details: err.message });
  }
});

// GET all orders
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// GET order by ID
router.get('/:order_id', async (req, res) => {
  const { order_id } = req.params;
  try {
    const orderResult = await pool.query('SELECT * FROM orders WHERE id = $1', [order_id]);
    if (orderResult.rows.length === 0) return res.status(404).json({ error: "Order not found" });

    const itemsResult = await pool.query('SELECT * FROM order_items WHERE order_id = $1', [order_id]);

    res.json({
      order: orderResult.rows[0],
      items: itemsResult.rows
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// DELETE order
router.delete('/:order_id', async (req, res) => {
  const { order_id } = req.params;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const itemsResult = await client.query('SELECT part_id, quantity FROM order_items WHERE order_id = $1', [order_id]);
    if (itemsResult.rows.length === 0) return res.status(404).json({ error: "Order not found" });

    // Restore stock
    for (const item of itemsResult.rows) {
      await client.query('UPDATE parts SET stock = stock + $1 WHERE id = $2', [item.quantity, item.part_id]);
    }

    await client.query('DELETE FROM order_items WHERE order_id = $1', [order_id]);
    await client.query('DELETE FROM orders WHERE id = $1', [order_id]);

    await client.query('COMMIT');
    res.json({ success: true, message: "Tilaus peruttu onnistuneesti" });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error("Transaction error:", err.message, err.stack);
    res.status(500).json({ error: "Failed to delete order", details: err.message });
  } finally {
    client.release();
  }
});

module.exports = router;
