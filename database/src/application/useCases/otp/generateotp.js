class GenerateOtp {
    constructor(optService) {
        this.optService = optService;
    }

    async execute(email) {
        try{
            const {otp, expiresAt} = await this.optService.generateOtp();
            await this.optService.saveOtp(email, otp, expiresAt);
            const success = await this.optService.sendotp(email, otp, expiresAt);

            if (!success) {
                throw new Error("ส่ง OTP ไม่สำเร็จ");
            }
        }catch(error){
            throw error;
        }
        return { message: "OTP ส่งสำเร็จ!" };
    }
}

module.exports = GenerateOtp;