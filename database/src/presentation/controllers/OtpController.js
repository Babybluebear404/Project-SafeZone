const GenerateOtp = require("../../application/useCases/otp/generateotp");
const VerifyOtp = require("../../application/useCases/otp/verifyotp");

class OtpController {
    constructor(otpService, otpRepository){
        this.otpService = otpService;
        this.generateOtpuseCase = new GenerateOtp(otpService);
        this.verifyOtpuseCase = new VerifyOtp(otpService, otpRepository);
    }

    // ฟังก์ชันสำหรับส่ง OTP
    async sendOtp(req, res) {
        try {
            const { email } = req.body;

            // ตรวจสอบว่ามีอีเมลที่ส่งมาหรือไม่
            if (!email) {
                return res.status(400).json({ error: "กรุณากรอกอีเมล" });
            }

            // เรียกใช้งาน UseCase เพื่อสร้าง OTP
            await this.generateOtpuseCase.execute(email);
            
            // ส่งข้อความตอบกลับเมื่อ OTP ถูกส่งสำเร็จ
            res.status(201).json({ message: "OTP ส่งสำเร็จ!" });
        } catch (error) {
            // ส่งข้อความตอบกลับหากเกิดข้อผิดพลาด
            res.status(400).json({ error: error.message });
        }
    }

    // ฟังก์ชันสำหรับตรวจสอบ OTP
    async verifyOtp(req, res) {
        try {
            const { email, otp } = req.body;

            // ตรวจสอบว่ามีข้อมูลที่จำเป็นหรือไม่
            if (!email || !otp) {
                return res.status(400).json({ error: "กรุณากรอกอีเมลและ OTP" });
            }

            // เรียกใช้งาน UseCase เพื่อตรวจสอบ OTP
            const result = await this.verifyOtpuseCase.execute(email, otp);

            // ส่งข้อความตอบกลับ
            if (result.success) {
                return res.status(201).json(result); // ส่งข้อความสำเร็จ
            } else {
                // หาก OTP ไม่ถูกต้องหรือหมดอายุ
                return res.status(400).json(result); // ส่งข้อความผิดพลาด
            }
        } catch (error) {
            // ส่งข้อความตอบกลับหากเกิดข้อผิดพลาด
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = OtpController;
