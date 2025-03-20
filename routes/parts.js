const express = require('express');
const router = express.Router();
const connection = require('../db');

router.post('/parts', (req, res) => {
    const { name, description, price, stock, category, image_url, part_number } = req.body;

    if (!name || !price) {
        return res.status(400).json({ error: "Name and price are required" });
    }

    const part = { name, description, price, stock, category, image_url, part_number };

    connection.query('INSERT INTO parts SET ?', part, (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json({ message: "Part added successfully", partId: results.insertId });
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