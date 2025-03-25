const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

const ADMIN_CREDENTIALS = {
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD
};

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if(username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        // Generate JWT token
        const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {expiresIn: '1h'});
        return res.json({message:"Login successful", token});
    }
    
    return res.status(401).json({error: "Invalid credentials"});
});

module.exports = router;
