class VerifyOtp {
    constructor(optService) {
        this.optService = optService;
    }

    async execute(email, otp) {
        try{
            const isValid = await this.optService.verifyOtp(email, otp);
            if (!isValid) {
                throw new Error("OTP ไม่ถูกต้อง หรือหมดอายุ");
            }
        }catch(error){
            throw error;
        }
    }
}

module.exports = VerifyOtp;