class OtpService {
    constructor(OtpService, EmailService){
        this.otpService = OtpService;
        this.emailService = EmailService;
    }
    
    async generateOtp() {
        const otp = Math.floor(100000 + Math.random() * 900000); // 6 หลัก
        const expiresAt = Date.now() + 5 * 60 * 1000;
        return{otp, expiresAt};
    }

    async saveOtp(email, otp, expiresAt) {
        await this.otpService.saveOtp(email, otp, expiresAt);
    }

    async verifyOtp(email) {
        return await this.otpService.getOtp(email);
    }

    async sendotp(email, otp, expiresAt){
        return await this.emailService.sendOtp(email, otp, expiresAt);
    }
}

module.exports = OtpService;