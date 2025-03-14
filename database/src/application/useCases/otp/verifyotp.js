class VerifyOtp {
    constructor(otpService, otpRepository) {
        this.otpService = otpService;
        this.otpRepository = otpRepository;
    }

    async execute(email, userotp) {
        try{
            const isValid = await this.otpService.verifyOtp(email);

            if (!isValid) {
                return { success: false, message: "ไม่มี OTP สำหรับอีเมลนี้" };
            }

            const { otp, expiresAt } = isValid;

            if (Date.now() > expiresAt) {
                await this.otpRepository.deleteOtp(email); // ลบ OTP ที่หมดอายุ
                return { success: false, message: "OTP หมดอายุแล้ว" };
            }

            if (String(otp) !== userotp) {
                return { success: false, message: "OTP ไม่ถูกต้อง" };
            }

            await this.otpRepository.deleteOtp(email); // ใช้แล้วลบออก
            return { success: true, message: "OTP ถูกต้อง" };
        }catch(error){
            throw error;
        }
    }
}

module.exports = VerifyOtp;