require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const parts = require('./routes/parts');
const auth = require('./routes/adminAuth');
const orders = require('./routes/orders');
const pool = require('./db');
const checkout = require('./routes/payments');
const webhooks = require('./routes/webhooks');

const app = express();
app.set('trust proxy', true);

app.use(cors());


// IMPORTANT: Use express.raw ONLY on the webhook route BEFORE express.json()
app.use('/api/webhook', express.raw({ type: 'application/json' }));

// Use express.json() for all other routes (including webhook if needed after raw parsing)
app.use(express.json());

// Test DB connection
pool.connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch(err => {
    console.error("Error connecting to PostgreSQL", err);
    process.exit(1);
  });
app.get('/', (req, res) => {
  res.send('Backend API is running');
});

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes (except webhook)
app.use('/api/auth', auth);
app.use('/api/parts', parts);
app.use('/api/orders', orders);
app.use('/api', checkout);

// Webhook route (already handled above with raw body middleware)
app.use('/api', webhooks);

const port = process.env.PORT || 3000;  // Use Render's port or fallback locally
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
