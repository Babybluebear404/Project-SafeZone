const jwt = require('jsonwebtoken');
require('dotenv').config();

const resetToken = (userid, useremail) => {
    return jwt.sign({ id: userid, email: useremail }, process.env.JWT_RESET_SECRET, { expiresIn: "15m" });
};

module.exports = resetToken;
