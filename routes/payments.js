const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const pool = require('../db');

// PaymentIntent
router.post('/payment-intent', async (req, res) => {
    const { items } = req.body;

    if (!items || items.length === 0) {
        return res.status(400).json({ error: "Kori on tyhjä" });
    }

    let totalAmount = 0;

    // Total price from the cart items
    const partIds = items.map(item => item.part_id);
    const fetchPartsQuery = `SELECT id, price FROM parts WHERE id = ANY($1)`;

    try {
        const partsResult = await pool.query(fetchPartsQuery, [partIds]);

        const partPriceMap = {};
        partsResult.rows.forEach(part => {
            partPriceMap[part.id] = part.price;
        });

        // Total price for the order
        items.forEach(item => {
            const price = partPriceMap[item.part_id];
            if (!price) {
                return res.status(400).json({ error: `Invalid part_id: ${item.part_id}` });
            }
            totalAmount += price * item.quantity;
        });

        // Create payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount,
            currency: 'eur',
            automatic_payment_methods: { enabled: true },
        });
        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
        console.error("Error creating payment intent:", err);
        res.status(500).json({ error: "Failed to create payment intent" });
    }
});

// CHECKOUT SESSION (STRIPE HOSTED PAGE)
router.post("/create-checkout-session", async (req, res) => {
    const { items, shippingMethod } = req.body;
  
    const lineItems = items.map((item) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100), // in cents
      },
      quantity: item.quantity,
    }));
  
    // Add shipping as an extra item
    if (shippingMethod === "delivery") {
      lineItems.push({
        price_data: {
          currency: "eur",
          product_data: { name: "Shipping" },
          unit_amount: 1000, // €10
        },
        quantity: 1,
      });
    }
  
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card", "klarna", "mobilepay"],
        mode: "payment",
        shipping_address_collection: {
          allowed_countries: ['FI', 'SE', 'US', 'GB', 'DE']
        }, 
        phone_number_collection: {
          enabled:true,
        },
        line_items: lineItems,
        success_url: "http://localhost:3001/success?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: "http://localhost:3001/ShoppingCart",
        metadata: {
          items: JSON.stringify(items),
          shippingMethod,
        }
      });
  
      res.json({ id: session.id });
    } catch (err) {
      console.error("Stripe error", err);
      res.status(500).json({ error: "Stripe session creation failed" });
    }
  });
  
 router.post("/verify-session", async (req, res) => {
  const { sessionId } = req.body;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      const items = JSON.parse(session.metadata.items); // [{ part_number, quantity }, ...]

      const client = await pool.connect();

      try {
        await client.query('BEGIN');

        for (const item of items) {
          // Fetch current stock for this part
          const partResult = await client.query(
            'SELECT stock FROM parts WHERE id = $1',
            [item.id]
          );

          if (partResult.rows.length === 0) {
            // Part not found - maybe log and skip or handle error
            console.warn(`Part not found: ${item.id}`);
            continue;
          }

          const currentStock = partResult.rows[0].stock;
          const newStock = currentStock - item.quantity;

          if (newStock < 0) {
            // Not enough stock - handle this case as needed
            await client.query('ROLLBACK');
            return res.status(400).json({ error: `Not enough stock for part ${item.id}` });
          } else if (newStock === 0) {
            // Delete part if stock hits zero
            await client.query('DELETE FROM parts WHERE id = $1', [item.id]);
          } else {
            // Otherwise update stock
            await client.query('UPDATE parts SET stock = $1 WHERE id = $2', [newStock, item.id]);
          }
        }

        await client.query('COMMIT');
        return res.sendStatus(200);
      } catch (dbErr) {
        await client.query('ROLLBACK');
        console.error('DB transaction error:', dbErr);
        return res.status(500).json({ error: "Database transaction failed" });
      } finally {
        client.release();
      }
    } else {
      return res.status(400).json({ error: "Payment not completed" });
    }
  } catch (err) {
    console.error("Error verifying session:", err);
    res.status(500).json({ error: "Session verification failed" });
  }
});

  

module.exports = router;