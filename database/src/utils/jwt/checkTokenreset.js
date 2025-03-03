const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // ดึง token จาก Headers
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    jwt.verify(token, process.env.JWT_RESET_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: "Forbidden" });
        req.user = user; // เพิ่ม user เข้า req
        next();
    });
};

module.exports = authenticateToken;