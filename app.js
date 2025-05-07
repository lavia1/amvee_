require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path'); // <-- Add this
const parts = require('./routes/parts');
const auth = require('./routes/adminAuth');
const orders = require('./routes/orders');
const pool = require('./db');

const app = express();

// Test DB connection
pool.connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch(err => {
    console.error("Error connecting to PostgreSQL", err);
    process.exit(1);
  });

app.use(cors());
app.use(express.json());

// ✅ Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Your API routes
app.use('/api/auth', auth);
app.use('/api/parts', parts);
app.use('/api/orders', orders);


app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
