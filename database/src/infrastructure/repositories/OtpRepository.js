class OtpRepository {
    constructor() {
        this.otpStorage = {};
    }

    async saveOtp(email, otp) {
        this.otpStorage[email] = otp;
    }

    async getOtp(email) {
        return this.otpStorage[email] || null;
    }

    async deleteOtp(email) {
        delete this.otpStorage[email];
    }
}

module.exports = OtpRepository;