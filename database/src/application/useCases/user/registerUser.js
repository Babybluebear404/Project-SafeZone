const Email = require('../../../domain/valueObjects/email');

class RegisterUser {
    constructor(userService) {
        this.userService = userService; // กำหนดค่า userService ที่จะใช้ในการดำเนินการต่างๆ เกี่ยวกับผู้ใช้
    }

    async execute(dto) {
        const { username, email, password } = dto; // ดึงค่าจาก DTO (Data Transfer Object)

        try {
            // ตรวจสอบว่าอีเมลถูกต้อง
            new Email(email); // ถ้าอีเมลไม่ถูกต้องจะโยน error ผ่าน constructor ของ Email

            // ตรวจสอบว่าอีเมลมีการใช้งานอยู่หรือยัง
            const existingUser = await this.userService.findUserByEmail(email); // ค้นหาผู้ใช้จากอีเมล
            if (existingUser) {
                throw new Error('Email already in use'); // ถ้าอีเมลถูกใช้แล้ว ให้โยน error
            }

            // สร้างผู้ใช้ใหม่
            await this.userService.register(username, email, password); // เรียกใช้ userService 
        } catch (error) {
            throw error; // โยนข้อผิดพลาดไปให้ผู้เรียกใช้จัดการต่อ
        }
    }
}

module.exports = RegisterUser;
