const express = require('express');
const router = express.Router();
const connection = require('../db'); // Regular MySQL (No .promise())

// Create Order (POST /api/orders)
router.post('/', (req, res) => {
    const { session_id, full_name, email, phone_number, country, street_address, city, postal_code, region, items, shipping_method } = req.body;

    // shipping method is either pickup or delivery
    if (!['pickup', 'delivery'].includes(shipping_method)) {
        return res.status(400).json({error: "Invalid shipping method"});
    }
    if (!items || items.length === 0) {
        return res.status(400).json({ error: "Order must have at least one item" });
    }

    const partIds = items.map(item => item.part_id);

    // Fetch prices and stock for the ordered parts
    const query = `SELECT id, price, stock FROM parts WHERE id IN (?)`;

    connection.query(query, [partIds], (err, parts) => {
        if (err) {
            console.error("Error fetching parts:", err);
            return res.status(500).json({ error: "Database error while fetching parts" });
        }

        // Create a mapping of part_id to price and stock
        const partPriceMap = {};
        const partStockMap = {};
        parts.forEach(part => {
            partPriceMap[part.id] = part.price;
            partStockMap[part.id] = part.stock;
        });

        let totalPrice = 0;
        const orderItemsValues = [];
        const stockUpdates = [];

        // Calculate total price and prepare order items
        for (const item of items) {
            if (!partPriceMap[item.part_id]) {
                return res.status(400).json({ error: `Invalid part_id: ${item.part_id}` });
            }

            const price = partPriceMap[item.part_id];
            totalPrice += price * item.quantity;

            orderItemsValues.push([item.part_id, item.quantity, price]);

            // Prepare the stock update query
            const currentStock = partStockMap[item.part_id];
            if (currentStock < item.quantity) {
                return res.status(400).json({ error: `Not enough stock for part_id: ${item.part_id}` });
            }

            stockUpdates.push({
                part_id: item.part_id,
                new_stock: currentStock - item.quantity
            });
        }
        // Set shipping cost based on shipping method 
        const shippingCost = (shipping_method === 'pickup') ? 0.00 : 10.00;
        const grandTotal = totalPrice + shippingCost;

        // Transaction to ensure both the order and stock updates are consistent
        connection.beginTransaction((err) => {
            if (err) {
                return res.status(500).json({ error: "Failed to start transaction" });
            }

            // Insert order into database
            const orderQuery = `
                INSERT INTO orders (session_id, full_name, email, phone_number, total_price, shipping_cost, grand_total, shipping_method, country, street_address, city, postal_code, region, status) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
            `;

            connection.query(orderQuery, 
                [session_id, full_name, email, phone_number, totalPrice, shippingCost, grandTotal, shipping_method, country, street_address, city, postal_code, region], 
                (err, orderResult) => {
                    if (err) {
                        return connection.rollback(() => {
                            console.error("Error creating order:", err);
                            return res.status(500).json({ error: "Failed to create order" });
                        });
                    }

                    const orderId = orderResult.insertId;

                    // Insert order items
                    const orderItemsQuery = `INSERT INTO order_items (order_id, part_id, quantity, price) VALUES ?`;
                    const formattedOrderItems = orderItemsValues.map(item => [orderId, ...item]);

                    connection.query(orderItemsQuery, [formattedOrderItems], (err) => {
                        if (err) {
                            return connection.rollback(() => {
                                console.error("Error adding order items:", err);
                                return res.status(500).json({ error: "Failed to add order items" });
                            });
                        }

                        // Update stock for each part in the order
                        const stockUpdateQuery = `UPDATE parts SET stock = ? WHERE id = ?`;
                        stockUpdates.forEach(stockUpdate => {
                            connection.query(stockUpdateQuery, [stockUpdate.new_stock, stockUpdate.part_id], (err) => {
                                if (err) {
                                    return connection.rollback(() => {
                                        console.error("Error updating stock:", err);
                                        return res.status(500).json({ error: "Failed to update stock" });
                                    });
                                }
                            });
                        });

                        // Commit transaction after everything is successful
                        connection.commit((err) => {
                            if (err) {
                                return connection.rollback(() => {
                                    console.error("Error committing transaction:", err);
                                    return res.status(500).json({ error: "Failed to commit transaction" });
                                });
                            }

                            // Success if order is created 
                            res.json({ success: true, message: "Order created", orderId, total_price: totalPrice, shipping_cost: shippingCost, grand_total: grandTotal, shipping_method });
                        });
                    });
                }
            );
        });
    });
});


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

// Get order with order id
router.get('/:order_id', (req, res) =>{
    const {order_id} = req.params;

    const orderQuery = `SELECT * FROM orders WHERE id = ?`;

    connection.query(orderQuery, [order_id], (err, orderResult) => {
        if (err) {
            console.log("Error fetching order:",err);
            return res.status(500).json({error:"Databse error while fetching order"});
        }
        if (orderResult.length === 0) {
            return res.status(404).json({error:"Order not found"});
        }
        // Fetch the order items associated with the order
        const orderItemsQuery = 'SELECT * FROM order_items WHERE order_id = ?';

        connection.query(orderItemsQuery, [order_id], (err, orderItemsResult) => {
            if (err) {
                console.error("Error fetching order items:", err);
                return res.status(500).json({error:"Databse error while fetching order items"});
            }

            const orderDetails = {
                order: orderResult[0],
                items: orderItemsResult
            };

            res.json(orderDetails);
        });
    });
});

module.exports = router;
