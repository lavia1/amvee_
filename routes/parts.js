const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const connection = require('../db');
const verifyAdmin = require('../middleware/authMiddleware');

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed'), false);
    }
};

const upload = multer({ storage, fileFilter });

// POST route for adding parts and images
router.post('/', verifyAdmin, upload.array('images', 10), (req, res) => {
    const { name, model, part_number, description, price, quantity, category } = req.body;

    if (!name || !price) {
        return res.status(400).json({ error: "Name and price are required" });
    }

    const imageUrls = req.files.map(file => `/uploads/${file.filename}`);
    const mainImage = imageUrls[0] || null;

    connection.query('SELECT * FROM parts WHERE part_number = ?', [part_number], (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });

        if (results.length > 0) {
            // Update stock if part exists
            const existingPart = results[0];
            const newStock = existingPart.stock + Number(quantity);

            connection.query(
                'UPDATE parts SET stock = ? WHERE part_number = ?',
                [newStock, part_number],
                (err) => {
                    if (err) return res.status(500).json({ error: "Database error" });
                    res.json({ message: "Part stock updated successfully", partId: existingPart.id });
                }
            );
        } else {
            const newPart = {
                name,
                model,
                part_number,
                description,
                price,
                stock: Number(quantity),
                category,
                image_url: mainImage,
            };

            connection.query('INSERT INTO parts SET ?', newPart, (err, result) => {
                if (err) return res.status(500).json({ error: "Database error" });

                const partId = result.insertId;

                const imageInsertValues = imageUrls.map(url => [partId, url]);
                if (imageInsertValues.length > 0) {
                    connection.query('INSERT INTO part_images (part_id, image_url) VALUES ?', [imageInsertValues], (err) => {
                        if (err) console.error("Error saving images:", err);
                    });
                }

                res.json({ message: "Part and images added", partId });
            });
        }
    });
});

// Delete by part_number
router.delete('/:part_number', verifyAdmin, (req, res) => {
    const { part_number } = req.params;
    const { name } = req.body;

    let query = 'SELECT * FROM parts WHERE part_number = ?';
    let queryParams = [part_number];

    if (name) {
        query = 'SELECT * FROM parts WHERE part_number = ? AND name = ?';
        queryParams = [part_number, name];
    }

    connection.query(query, queryParams, (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });

        if (results.length === 0) {
            return res.status(404).json({ error: "Part not found" });
        }

        connection.query('DELETE FROM parts WHERE part_number = ?', [part_number], (err) => {
            if (err) return res.status(500).json({ error: "Database error" });

            res.json({ message: "Part deleted successfully" });
        });
    });
});

// Get all parts
router.get('/', (req, res) => {
    connection.query('SELECT * FROM parts', (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });

        res.json(results);
    });
});

// Search parts
router.get('/search', (req, res) => {
    const { name, part_number } = req.query;

    let query = 'SELECT * FROM parts WHERE 1=1';
    const queryParams = [];

    if (name) {
        query += ' AND name LIKE ?';
        queryParams.push(`%${name}%`);
    }

    if (part_number) {
        query += ' AND part_number LIKE ?';
        queryParams.push(`%${part_number}%`);
    }

    connection.query(query, queryParams, (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });

        if (results.length === 0) {
            return res.status(404).json({ error: "Part not found" });
        }

        res.json(results);
    });
});

// Get specific part by part_number
router.get('/:part_number', (req, res) => {
    const { part_number } = req.params;

    connection.query('SELECT * FROM parts WHERE part_number = ?', [part_number], (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });

        if (results.length === 0) {
            return res.status(404).json({ error: "Part not found" });
        }

        res.json(results[0]);
    });
});

module.exports = router;
