class OtpRepository {
    constructor() {
        this.otpStorage = new Map();
    }

    async saveOtp(email, otp, expiresAt) {
        this.otpStorage.set(email, {otp, expiresAt});
    }

    async getOtp(email) {
        return this.otpStorage.get(email);
    }

    async deleteOtp(email) {
        this.otpStorage.delete(email);
    }
}

module.exports = OtpRepository;