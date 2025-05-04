const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const verifyAdmin = require('../middleware/authMiddleware');
const pool = require('../db'); 

// Multer configuration for handling multiple files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Save images in the "uploads" folder
    },
    filename: function (req, file, cb) {
        // Generate unique filename using current timestamp and the file extension
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// File filter to allow only image files
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed'), false);
    }
};

// Setup multer with storage and file filter
const upload = multer({ storage, fileFilter });

// POST route for adding parts and images
router.post('/', verifyAdmin, upload.array('images', 5), async (req, res) => {
    const { name, model, part_number, description, price, quantity, category } = req.body;

    if (!name || !price) {
        return res.status(400).json({ error: "Name and price are required" });
    }

    // Store the image URLs in an array, or null if no images were uploaded
    const imageUrls = req.files ? req.files.map(file => `/uploads/${file.filename}`) : null;

    try {
        // Check if the part already exists
        const existing = await pool.query('SELECT * FROM parts WHERE part_number = $1', [part_number]);

        if (existing.rows.length > 0) {
            // Update stock if part exists
            const existingPart = existing.rows[0];
            const newStock = existingPart.stock + Number(quantity);

            await pool.query('UPDATE parts SET stock = $1 WHERE part_number = $2', [newStock, part_number]);

            return res.json({ message: "Part stock updated successfully", partId: existingPart.id });
        } else {
            // Insert new part into the database
            const insertPartQuery = `
                INSERT INTO parts 
                (name, model, part_number, description, price, stock, category, image_url) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING id
            `;
            const insertValues = [name, model, part_number, description, price, quantity, category, imageUrls];
            const result = await pool.query(insertPartQuery, insertValues);
            const partId = result.rows[0].id;

            return res.json({ message: "Part added", partId });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});


// Get specific part by part_number
router.get('/:part_number', async (req, res) => {
    const { part_number } = req.params;

    try {
        const result = await pool.query('SELECT * FROM parts WHERE part_number = $1', [part_number]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Part not found" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: "Database error" });
    }
});

// Put route for updating a part 
router.put('/:part_number', verifyAdmin, upload.array('images, 5'), async (req, res) => {
    const {part_number} = req.params;
    const {name, model, description, price, quantity, category} = req.body;

    const imageUrls = req.files ? req.files.map(file => `/uploads/${file.filename}`) : null;

    if (!name || !price) {
        return res.status(400).json({error: "Nimi ja hinta tarvitaan"});
    }

    try {
        const existing = await pool.query('SELECT * FROM parts WHERE part_number = $1', [part_number]);

        if (existing.rows.length === 0) {
            return res.status(400).json({error: "Part not found"});
        }

        const updateQuery= `
            UPDATE parts
            SET name = $1, model = $2, description = $3, price = $4, stock = $5, category = $6, image_url = $7
            WHERE part_number = $8
            RETURNING id
        `;
        const updateValues = [name, model, description, price, quantity, category,imageUrls, part_number];

        const updateResult = await pool.query(updateQuery, updateValues);
        res.json({message: "Osa päivitetty onnistuneesti", partId: updateResult.rows[0].id});
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Database error"});
    }
});

// Get all parts
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM parts');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: "Database error" });
    }
});

// Delete by part_number
router.delete('/:part_number', verifyAdmin, async (req, res) => {
    const { part_number } = req.params;
    const { name } = req.body;

    try {
        let query = 'SELECT * FROM parts WHERE part_number = $1';
        let params = [part_number];

        if (name) {
            query += ' AND name = $2';
            params.push(name);
        }

        const result = await pool.query(query, params);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Part not found" });
        }

        await pool.query('DELETE FROM parts WHERE part_number = $1', [part_number]);

        res.json({ message: "Part deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});


// Search parts
router.get('/search', async (req, res) => {
    const { name, part_number } = req.query;

    let query = 'SELECT * FROM parts WHERE 1=1';
    const params = [];
    let paramIndex = 1;

    if (name) {
        query += ` AND name ILIKE $${paramIndex++}`;
        params.push(`%${name}%`);
    }

    if (part_number) {
        query += ` AND part_number::text ILIKE $${paramIndex++}`;
        params.push(`%${part_number}%`);
    }

    try {
        const result = await pool.query(query, params);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Part not found" });
        }
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});

module.exports = router;
