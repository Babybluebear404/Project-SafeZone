class GenerateOtp {
    constructor(optService) {
        this.optService = optService;
    }

    async execute(email) {
        try{
            const otp = await this.optService.generateOtp();
            await this.optService.saveOtp(email, otp);
            const success = await this.optService.sendotp(email, otp);

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