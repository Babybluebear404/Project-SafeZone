class Email {
    constructor(email) {
        if (!this.isValidEmail(email)) {
            throw new Error("Invalid email format");
        }
        this.email = email;
    }

    isValidEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }
}

module.exports = Email;
