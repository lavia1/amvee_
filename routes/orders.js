const express = require('express');
const router = express.Router();
const pool = require('../db'); // pg Pool

// Create Order (POST /api/orders)
router.post('/', async (req, res) => {
    const {
        session_id, full_name, email, phone_number, country,
        street_address, city, postal_code, region,
        items, shipping_method
    } = req.body;

    if (!['pickup', 'delivery'].includes(shipping_method)) {
        return res.status(400).json({ error: "Invalid shipping method" });
    }

    if (!items || items.length === 0) {
        return res.status(400).json({ error: "Order must have at least one item" });
    }

    const partIds = items.map(item => item.part_id);
    const fetchPartsQuery = `SELECT id, price, stock FROM parts WHERE id = ANY($1)`;  

    try {
        // Fetch parts information
        const partsResult = await pool.query(fetchPartsQuery, [partIds]);

        const partPriceMap = {};
        const partStockMap = {};
        partsResult.rows.forEach(part => {
            partPriceMap[part.id] = part.price;
            partStockMap[part.id] = part.stock;
        });

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

        const shippingCost = shipping_method === 'pickup' ? 0.00 : 10.00;
        const grandTotal = totalPrice + shippingCost;

        // Begin transaction
        const client = await pool.connect();
        try {
            await client.query('BEGIN');  // Start the transaction

            // Insert order into orders table
            const orderQuery = `
                INSERT INTO orders (session_id, full_name, email, phone_number, total_price, shipping_cost, grand_total, shipping_method, country, street_address, city, postal_code, region, status)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, 'pending')
                RETURNING id
            `;

            const orderResult = await client.query(orderQuery, [
                session_id, full_name, email, phone_number,
                totalPrice, shippingCost, grandTotal, shipping_method,
                country, street_address, city, postal_code, region
            ]);

            const orderId = orderResult.rows[0].id;  

            
            const orderItemsQuery = `
                INSERT INTO order_items (order_id, part_id, quantity, price) 
                VALUES ($1, $2, $3, $4)
            `;

            for (const item of orderItemsValues) {
                await client.query(orderItemsQuery, [orderId, ...item]);
            }

            // Update stock in parts table
            const stockUpdateQuery = `
                UPDATE parts SET stock = $1 WHERE id = $2
            `;
            for (const { part_id, new_stock } of stockUpdates) {
                await client.query(stockUpdateQuery, [new_stock, part_id]);
            }

            
            await client.query('COMMIT');

            // Respond to the client
            res.json({
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
            console.error("Transaction error:", err);
            res.status(500).json({ error: "Failed to create order" });
        } finally {
            client.release();  
        }
    } catch (err) {
        console.error("Error fetching parts:", err);
        res.status(500).json({ error: "Database error while fetching parts" });
    }
});

// Gets all orders
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM orders');
        res.json(result.rows);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: "Database error" });
    }
});

// Get order with order id
router.get('/:order_id', async (req, res) => {
    const { order_id } = req.params;

    try {
        const orderQuery = 'SELECT * FROM orders WHERE id = $1';
        const orderResult = await pool.query(orderQuery, [order_id]);

        if (orderResult.rows.length === 0) {
            return res.status(404).json({ error: "Order not found" });
        }

        // Fetch the order items associated with the order
        const orderItemsQuery = 'SELECT * FROM order_items WHERE order_id = $1';
        const orderItemsResult = await pool.query(orderItemsQuery, [order_id]);

        const orderDetails = {
            order: orderResult.rows[0],
            items: orderItemsResult.rows
        };

        res.json(orderDetails);
    } catch (err) {
        console.error("Error fetching order:", err);
        res.status(500).json({ error: "Database error while fetching order" });
    }
});

// Delete Order (DELETE /api/orders/:order_id)
router.delete('/:order_id', async (req, res) => {
    const { order_id } = req.params;

    const client = await pool.connect();

    try {
      
        await client.query('BEGIN');

        // Fetch order items associated with this order to restore stock
        const orderItemsQuery = 'SELECT part_id, quantity FROM order_items WHERE order_id = $1';
        const orderItemsResult = await client.query(orderItemsQuery, [order_id]);

        if (orderItemsResult.rows.length === 0) {
            return res.status(404).json({ error: "Order not found" });
        }

        // Prepare stock updates for each part in the order
        const stockUpdates = orderItemsResult.rows.map(item => ({
            part_id: item.part_id,
            quantity: item.quantity
        }));

        // Update the stock for each part in the order
        const stockUpdateQuery = 'UPDATE parts SET stock = stock + $1 WHERE id = $2';
        for (const { part_id, quantity } of stockUpdates) {
            await client.query(stockUpdateQuery, [quantity, part_id]);
        }

        // Delete order items
        const deleteOrderItemsQuery = 'DELETE FROM order_items WHERE order_id = $1';
        await client.query(deleteOrderItemsQuery, [order_id]);

        // Delete the order
        const deleteOrderQuery = 'DELETE FROM orders WHERE id = $1';
        await client.query(deleteOrderQuery, [order_id]);

        // Commit transaction
        await client.query('COMMIT');

        // Respond to the client
        res.json({ success: true, message: "Tilaus peruttu onnistuneesti" });

    } catch (err) {
        
        await client.query('ROLLBACK');
        console.error("Transaction error:", err);
        res.status(500).json({ error: "Failed to delete order" });
    } finally {
        client.release();  
    }
});


module.exports = router;