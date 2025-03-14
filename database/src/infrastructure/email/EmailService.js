const nodemailer = require("nodemailer");
require("dotenv").config();

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    }

    async sendOtp(email, otp, expiresAt) {
        const formattedTime = new Date(expiresAt).toLocaleTimeString("th-TH", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "รหัส OTP ของคุณ",
            text: `รหัส OTP ของคุณคือ: ${otp} (หมดอายุใน ${formattedTime} นาที)`,
        };

        try {
            await this.transporter.sendMail(mailOptions);
            return true;
        } catch (error) {
            console.error("Error sending email:", error);
            return false;
        }
    }
}

module.exports = EmailService;