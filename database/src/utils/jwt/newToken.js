const jwt = require('jsonwebtoken');
require('dotenv').config();

const newToken = (userid, useremail) => {
    return jwt.sign({ id: userid, email: useremail }, process.env.JWT_SECRET, { expiresIn: "7h" });
};

module.exports = newToken;
