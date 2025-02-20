class PasswordError extends Error {
    constructor(message = "Passwords do not match!") {
        super(message);
        this.name = "PasswordError";
    }
}

module.exports = PasswordError;