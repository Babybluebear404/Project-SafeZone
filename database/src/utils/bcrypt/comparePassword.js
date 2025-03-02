const bcrypt = require('bcrypt');

const comparePassword = async (password, hashedPassword) => {
    const compare = await bcrypt.compare(password, hashedPassword);
    if (!compare) {
        throw new Error('Incorrect password');
    }
    return compare;
};

module.exports = comparePassword;