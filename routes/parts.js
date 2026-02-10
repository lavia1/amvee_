const express = require('express');
const router = express.Router();
const verifyAdmin = require('../middleware/authMiddleware');
const pool = require('../db'); 
const upload = require('../middleware/upload'); // multer + cloudinary


// POST route for adding parts and images
router.post('/', verifyAdmin, upload.array('images', 5), async (req, res) => {
  const { name, model, part_number, description, price, quantity, category } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: "Name and price are required" });
  }

  try {
    const existing = await pool.query(
      'SELECT * FROM parts WHERE part_number = $1',
      [part_number]
    );

    if (existing.rows.length > 0) {
      const existingPart = existing.rows[0];
      const newStock = existingPart.stock + Number(quantity);

      await pool.query(
        'UPDATE parts SET stock = $1 WHERE part_number = $2',
        [newStock, part_number]
      );

      return res.json({
        message: "Part stock updated successfully",
        partId: existingPart.id
      });
    }

    const insertPartQuery = `
      INSERT INTO parts
      (name, model, part_number, description, price, stock, category)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `;

    const insertValues = [
      name,
      model,
      part_number,
      description,
      price,
      quantity,
      category
    ];

    const result = await pool.query(insertPartQuery, insertValues);
    const partId = result.rows[0].id;

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        await pool.query(
          'INSERT INTO parts_images (part_id, image_url) VALUES ($1, $2)',
          [partId, file.path]
        );
      }
    }

    res.json({ message: "Part added", partId });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});



// Get specific part by part_number
router.get('/:part_number', async (req, res) => {
    const { part_number } = req.params;

    try {
        const result = await pool.query(`
            SELECT p.*,
                COALESCE(
                    json_agg(pi.image_url) FILTER (WHERE pi.image_url IS NOT NULL),
                    '[]'
                ) AS images
            FROM parts p
            LEFT JOIN parts_images pi ON pi.part_id = p.id
            WHERE p.part_number = $1
            GROUP BY p.id
        `, [part_number]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Part not found" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});

// Put route for updating a part 
router.put('/:part_number', verifyAdmin, async (req, res) => {
  const { part_number } = req.params;
  const { name, model, description, price, quantity, category } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: "Nimi ja hinta tarvitaan" });
  }

  try {
    const existing = await pool.query(
      'SELECT * FROM parts WHERE part_number = $1',
      [part_number]
    );

    if (existing.rows.length === 0) {
      return res.status(404).json({ error: "Part not found" });
    }

    const updateQuery = `
      UPDATE parts
      SET name = $1,
          model = $2,
          description = $3,
          price = $4,
          stock = $5,
          category = $6
      WHERE part_number = $7
      RETURNING id
    `;

    const updateValues = [
      name,
      model,
      description,
      price,
      quantity,
      category,
      part_number
    ];

    const updateResult = await pool.query(updateQuery, updateValues);

    res.json({
      message: "Osa päivitetty onnistuneesti",
      partId: updateResult.rows[0].id
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});


// Get all parts
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        p.*,
        COALESCE(
          json_agg(pi.image_url) FILTER (WHERE pi.image_url IS NOT NULL),
          '[]'
        ) AS images
      FROM parts p
      LEFT JOIN parts_images pi ON pi.part_id = p.id
      GROUP BY p.id
    `);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
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

        res.json({ message: "Osa poistettu onnistuneesti" });
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
