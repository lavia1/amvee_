const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/', express.raw({type:'application/json'}), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object; 

        const items = JSON.parse(session.metadata.items);

        const orderData = {
            session_id: session.id,
            full_name: session.metadata.full_name,
            email: session.customer_email,
            phone_number: session.metadata.phone_number,
            country: session.metadata.country,
            street_address: session.metadata.street_address,
            city: session.metadata.city,
            postal_code: session.metadata.postal_code,
            region: session.metadata.region,
            items: items,
            shipping_method: session.metadata.shippingMethod,
        };

        try {
            await createOrderInDB(orderData);
            res.status(200).json({received: true});
        } catch (error) {
            console.error("Order creation failed", error);
            res.status(500).json({error: "order processing failed"});
        }
    } else {
        res.status(200).end();
    }
}); 

module.exports = router;