const express = require('express');
const router = express.Router();
const connection = require('../db');
const verifyAdmin = require('../middleware/authMiddleware');

router.post('/', verifyAdmin, (req, res) => {
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
            // Add part if not existed
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
// Delete with part number
router.delete('/:part_number', verifyAdmin, (req, res) => {
    const { part_number } = req.params; // Get the part_number from the URL
    const { name } = req.body; // Get the name from the body, if provided

    let query = 'SELECT * FROM parts WHERE part_number = ?';
    let queryParams = [part_number];

    // If name is provided, modify the query to search by part_number and name
    if (name) {
        query = 'SELECT * FROM parts WHERE part_number = ? AND name = ?';
        queryParams = [part_number, name];
    }

    // Check if the part exists first
    connection.query(query, queryParams, (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }

        if (results.length === 0) {
            // If no part was found
            return res.status(404).json({ error: "Part not found" });
        }

        // If the part exists, proceed to delete it
        connection.query('DELETE FROM parts WHERE part_number = ?', [part_number], (err, deleteResults) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ error: "Database error" });
            }

            // Successfully deleted the part
            res.json({ message: "Part deleted successfully" });
        });
    });
});

// Gets all 
router.get('/', (req, res) => {
    connection.query('SELECT * FROM parts', (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({error: "Database error"});
        }
        res.json(results);
    });
});
router.get('/:part_number', (req, res) => {
    const {part_number} = req.params;

    connection.query('SELECT * FROM parts WHERE part_number = ?', [part_number], (err, results) => {
        if (err) {
            console.log("Database error:", err);
            return res.status(500).json({error:"Database error"});
        }
        
        if (results.length === 0) {
            return res.status(404).json({error: "Part not found"});
        }

        res.json(results[0]);
    });
});


module.exports = router;