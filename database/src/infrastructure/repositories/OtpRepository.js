class OtpRepository {
    constructor() {
        this.otpStorage = new Map();
    }

    async saveOtp(email, otp, expiresAt) {
        this.otpStorage.set(email, {otp, expiresAt});
        console.log(this.otpStorage);
    }

    async getOtp(email) {
        return this.otpStorage.get(email);
    }

    async deleteOtp(email) {
        this.otpStorage.delete(email);
    }
}

module.exports = OtpRepository;