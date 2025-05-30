const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const axios = require("axios");
const pool = require("../db"); // make sure this is your correct DB connection file

router.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const shipping = session.shipping || {};
    const address = shipping.address || {};
    const customerEmail = session.customer_details?.email || "";
    const phoneNumber = session.customer_details?.phone || shipping.phone || null;

    const items = JSON.parse(session.metadata.items);
    const shippingMethod = session.metadata.shippingMethod;

    const orderData = {
      session_id: session.id,
      full_name: shipping.name || "",
      email: customerEmail,
      phone_number: phoneNumber,
      country: address.country || "",
      street_address: address.line1 || "",
      city: address.city || "",
      postal_code: address.postal_code || "",
      region: address.state || "",
      items,
      shipping_method: shippingMethod,
      total_price: session.amount_subtotal / 100,
      shipping_cost: (session.amount_total - session.amount_subtotal) / 100,
      grand_total: session.amount_total / 100,
    };

    try {
      
      await axios.post("http://localhost:3000/api/orders", orderData);

      
      for (const item of items) {
        const { id: partId, quantity } = item;
        await pool.query(
          'UPDATE parts SET stock = stock - $1 WHERE id = $2 AND stock >= $1',
          [quantity, partId]
        );
      }

      res.status(200).json({ received: true });
    } catch (error) {
      console.error("Order creation or stock update failed:", error?.response?.data || error.message);
      res.status(500).json({ error: "Order processing failed" });
    }
  } else {
    res.status(200).end(); 
  }
});

module.exports = router;

