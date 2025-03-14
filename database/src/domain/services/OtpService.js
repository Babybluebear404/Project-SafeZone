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

    async verifyOtp(email, otp, expiresAt) {
        const storedOtp = OtpRepository.getOtp(email);
        if (storedOtp && storedOtp == otp) {
            OtpRepository.deleteOtp(email);
            return true;
        }
        return false;
    }

    async sendotp(email, otp){
        return await this.emailService.sendOtp(email, otp);
    }
}

module.exports = OtpService;