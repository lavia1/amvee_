const express = require('express');
const router = express.Router();
const connection = require('../db');

router.post('/parts', (req, res) => {
    const { name, model, part_number, description, price, stock, category, image_url, quantity } = req.body;

    if (!name || !price) {
        return res.status(400).json({ error: "Name and price are required" });
    }

    connection.query('SELECT * FROM parts WHERE part_number = ?', [part_number], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({error: "Database error"});
        }

        if (results.length > 0) {
            // Update stock if part exists
            const existingPart = results[0];
            const newStock = existingPart.stock + quantity;
        

        connection.query(
            'UPDATE parts SET stock = ? WHERE part_number = ?',
            [newStock, part_number],
            (err, updateResults) => {
                if (err) {
                    console.log("Database error:", err);
                    return res.status(500).json({error: "Database error"});
                }
                res.json({message: "Part stock updated successfully", partId: existingPart.id });
            }
        );
        } else {
            const part = { name, model, part_number, description, price, stock: quantity, category, image_url, part_number };

            connection.query('INSERT INTO parts SET ?', part, (err, results) => {
                if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ error: "Database error" });
            }
            res.json({ message: "Part added successfully", partId: results.insertId });
            });
        }
    });
});

router.get('/parts', (req, res) => {
    connection.query('SELECT * FROM parts', (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({error: "Database error"});
        }
        res.json(results);
    });
});



module.exports = router;