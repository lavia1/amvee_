const jwt = require('jsonwebtoken');

//const allowedIPs = process.env.ALLOWED_IPS ? process.env.ALLOWED_IPS.split(',') : [];
// Checking allowed IPs
const verifyAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({error: "Access denied, no token provided"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        console.log("Request IP:", req.ip);
    

        // Checking if IP address is allowed
        //const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        //console.log("Client IP:", clientIP);
        //if (!allowedIPs.includes(clientIP)) {
        //    return res.status(403).json({error: "Access denied from this IP"});
        //}

        next(); //Proceed to admin routes
    } catch (error) {
        return res.status(403).json({error:"Invalid or expired token"});
    }
};

module.exports = verifyAdmin;