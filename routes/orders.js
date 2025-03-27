const express = require('express');
const router = express.Router();
const connection = require('../db'); // Regular MySQL (No .promise())

// Create Order (POST /api/orders)
router.post('/', (req, res) => {
    const { session_id, full_name, email, phone_number, total_price, country, street_address, city, postal_code, region, items } = req.body;

    // Insert Order into MySQL
    const orderQuery = `INSERT INTO orders (session_id, full_name, email, phone_number, total_price, country, street_address, city, postal_code, region, status) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`;
    
    connection.query(orderQuery, 
        [session_id, full_name, email, phone_number, total_price, country, street_address, city, postal_code, region], 
        (err, orderResult) => {
            if (err) {
                console.error("Error creating order:", err);
                return res.status(500).json({ error: "Failed to create order." });
            }

            const orderId = orderResult.insertId;

            // Insert Order Items
            const orderItemsQuery = `INSERT INTO order_items (order_id, part_id, quantity, price) VALUES ?`;
            const orderItemsValues = items.map(item => [orderId, item.part_id, item.quantity, item.price]);

            connection.query(orderItemsQuery, [orderItemsValues], (err) => {
                if (err) {
                    console.error("Error adding order items:", err);
                    return res.status(500).json({ error: "Failed to add order items." });
                }

                res.json({ success: true, message: "Order created", orderId });
            });
        }
    );

// Gets all 
router.get('/', (req, res) => {
    connection.query('SELECT * FROM orders', (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({error: "Database error"});
        }
        res.json(results);
    });
});
});

module.exports = router;
