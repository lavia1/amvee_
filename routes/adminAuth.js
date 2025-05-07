const express = require('express');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const router = express.Router();
// Login only for admin
const ADMIN_CREDENTIALS = {
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD
};

// Rate limiter for the login route
const loginRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: "Liian monta yritystä tästä IP -osoitteesta.",
    headers: true,

});

router.post('/login', loginRateLimiter, (req, res) => {
    const { username, password } = req.body;

    if(username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        // Generate JWT token
        const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {expiresIn: '1h'});
        return res.json({message:"Login successful", token});
    }
    
    return res.status(401).json({error: "Invalid credentials"});
});

module.exports = router;
