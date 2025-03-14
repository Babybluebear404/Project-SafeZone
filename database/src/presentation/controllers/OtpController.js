const GenerateOtp = require("../../application/useCases/otp/generateotp");
const VerifyOtp = require("../../application/useCases/otp/verifyotp");

class OtpController {
    constructor(otpService){
        this.otpService = otpService;
        this.generateOtpuseCase = new GenerateOtp(otpService);
        this.verifyOtpuseCase = new VerifyOtp(otpService);
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
            const result = await this.generateOtpuseCase.execute(email);
            
            // ส่งข้อความตอบกลับเมื่อ OTP ถูกส่งสำเร็จ
            res.json({
                message: "OTP ส่งสำเร็จ!",
                otp: result.otp // สมมติว่า result จะคืนค่า OTP ที่สร้างขึ้น
            });
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
            await this.verifyOtpuseCase.execute(email, otp);

            // ส่งข้อความตอบกลับหาก OTP ถูกต้อง
            res.json({ message: "OTP ถูกต้อง"});
        } catch (error) {
            // ส่งข้อความตอบกลับหากเกิดข้อผิดพลาด
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = OtpController;
