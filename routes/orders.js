const express = require('express');
const router = express.Router();
const connection = require('../db'); // Regular MySQL (No .promise())

// Create Order (POST /api/orders)
router.post('/', (req, res) => {
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
    const fetchPartsQuery = `SELECT id, price, stock FROM parts WHERE id IN (?)`;

    connection.query(fetchPartsQuery, [partIds], (err, parts) => {
        if (err) {
            console.error("Error fetching parts:", err);
            return res.status(500).json({ error: "Database error while fetching parts" });
        }

        const partPriceMap = {};
        const partStockMap = {};
        parts.forEach(part => {
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

        connection.beginTransaction((err) => {
            if (err) {
                return res.status(500).json({ error: "Failed to start transaction" });
            }

            const orderQuery = `
                INSERT INTO orders (session_id, full_name, email, phone_number, total_price, shipping_cost, grand_total, shipping_method, country, street_address, city, postal_code, region, status)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
            `;

            connection.query(orderQuery, [
                session_id, full_name, email, phone_number,
                totalPrice, shippingCost, grandTotal, shipping_method,
                country, street_address, city, postal_code, region
            ], (err, orderResult) => {
                if (err) {
                    return connection.rollback(() => {
                        console.error("Error creating order:", err);
                        return res.status(500).json({ error: "Failed to create order" });
                    });
                }

                const orderId = orderResult.insertId;
                const orderItemsQuery = `INSERT INTO order_items (order_id, part_id, quantity, price) VALUES ?`;
                const formattedItems = orderItemsValues.map(item => [orderId, ...item]);

                connection.query(orderItemsQuery, [formattedItems], (err) => {
                    if (err) {
                        return connection.rollback(() => {
                            console.error("Error adding order items:", err);
                            return res.status(500).json({ error: "Failed to add order items" });
                        });
                    }

                    // 🔄 Fix: Wait for all stock updates
                    const stockUpdateQuery = `UPDATE parts SET stock = ? WHERE id = ?`;
                    const stockUpdatePromises = stockUpdates.map(({ part_id, new_stock }) => {
                        return new Promise((resolve, reject) => {
                            connection.query(stockUpdateQuery, [new_stock, part_id], (err) => {
                                if (err) return reject(err);
                                resolve();
                            });
                        });
                    });

                    Promise.all(stockUpdatePromises)
                        .then(() => {
                            connection.commit((err) => {
                                if (err) {
                                    return connection.rollback(() => {
                                        console.error("Commit failed:", err);
                                        return res.status(500).json({ error: "Failed to commit transaction" });
                                    });
                                }

                                res.json({
                                    success: true,
                                    message: "Order created",
                                    orderId,
                                    total_price: totalPrice,
                                    shipping_cost: shippingCost,
                                    grand_total: grandTotal,
                                    shipping_method
                                });
                            });
                        })
                        .catch((err) => {
                            return connection.rollback(() => {
                                console.error("Error updating stock:", err);
                                return res.status(500).json({ error: "Failed to update stock" });
                            });
                        });
                });
            });
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