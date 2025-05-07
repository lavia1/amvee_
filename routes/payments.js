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
router.post('/create-checkout-session', async (req, res) => {
    const { items, shipping_cost } = req.body;

    try {
        const line_items = items.map(item => ({
            price_data: {
                currency: 'eur',
                product_data: {
                    name: item.name,
                },
                unit_amount: Math.round(item.price * 100),
            },
            quantity: item.quantity,
        }));

        if (shipping_cost > 0) {
            line_items.push({
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: 'Toimituskulut',
                    },
                    unit_amount: Math.round(shipping_cost * 100),
                },
                quantity: 1,
            });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items,
            success_url: 'http://localhost:3001/success',
            cancel_url: 'http://localhost:3001/cancel',
        });
        res.json({ id: session.id });
    } catch (err) {
        console.error('Stripe session error:', err);
        res.status(500).json({ error: 'Maksun luonti epäonnistui' });
    }
});

module.exports = router;