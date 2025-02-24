const jwt = require('jsonwebtoken');

const newToken = (userid, useremail) => {
    return jwt.sign({ id: userid, email: useremail }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

module.exports = newToken;
