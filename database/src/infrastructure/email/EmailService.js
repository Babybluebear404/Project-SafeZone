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
        const expiresInMinutes = Math.floor((expiresAt - Date.now()) / (60 * 1000));
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "รหัส OTP ของคุณ",
            text: `รหัส OTP ของคุณคือ: ${otp} (มีอยู่การใช้งาน ${expiresInMinutes} นาที)`,
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