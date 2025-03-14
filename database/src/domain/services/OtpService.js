class OtpService {
    constructor(OtpService, EmailService){
        this.otpService = OtpService;
        this.emailService = EmailService;
    }
    
    async generateOtp() {
        return Math.floor(100000 + Math.random() * 900000); // 6 หลัก
    }

    async saveOtp(email, otp) {
        await this.otpService.saveOtp(email, otp);
    }

    async verifyOtp(email, otp) {
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