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

router.post("/create-checkout-session", async (req, res) => {
  const { items, shippingMethod } = req.body; 

  const lineItems = items.map((item) => ({
    price_data: {
      currency: "eur",
      product_data: {
        name: item.name,
      },
      unit_amount: Math.round(item.price * 100), 
    },
    quantity: item.quantity,
  }));

  // Shipping as an extra item
  if (shippingMethod === "delivery") {
    lineItems.push({
      price_data: {
        currency: "eur",
        product_data: { name: "Shipping" },
        unit_amount: 1000, 
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
        enabled: true,
      },
      line_items: lineItems,
      success_url: `${process.env.FRONT_END_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONT_END_URL}/ShoppingCart`,
      metadata: {
        items: JSON.stringify(items),
        shippingMethod,
      },

    });

    res.json({ id: session.id });
  } catch (err) {
    console.error("Stripe error", err);
    res.status(500).json({ error: "Stripe session creation failed" });
  }
});

  // Verify session to clear cart
  router.post('/verify-session', async (req, res) => {
  const { sessionId } = req.body;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status === 'paid') {
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ success: false, message: 'Payment not complete' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;