const axios = require('axios');

class GoogleLogin {
    constructor(userService) {
        this.userService = userService;
    }

    async execute(dto) {
        const { access_token } = dto; // รับ access_token จาก Google

        try {
            // ดึงข้อมูลผู้ใช้จาก Google
            const { data: googleUserData } = await axios.get(
                `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
            );

            // ตรวจสอบว่าผู้ใช้มีอยู่ในฐานข้อมูลหรือไม่
            const user = await this.userService.findUserByEmail(googleUserData.email);
            //ถ้าไม่มีผู้ใช้ ให้สร้างบัญชีใหม่
            if (!user) {
                await this.userService.register(googleUserData.name, googleUserData.email, null);
            }
            const token = await this.userService.login(null, existingUser);
            return token; //token กลับไป
        } catch (error) {
            throw new Error("Google Login Failed: " + error.message);
        }
    }
}

module.exports = GoogleLogin;
