class Savequestion {
    constructor(questionService) {
        this.questionService = questionService; // กำหนดค่า questionService ที่จะใช้ในการดำเนินการต่างๆ เกี่ยวกับผู้ใช้
    }

    async execute(dto) {
        const { UserID, Q2, Q9 ,Q8} = dto; // ดึงค่าจาก DTO (Data Transfer Object)

        try {
            await this.questionService.savequestion(UserID, Q2, Q9, Q8);
        } catch (error) {
            throw error; // โยนข้อผิดพลาดไปให้ผู้เรียกใช้จัดการต่อ
        }
    }
}

module.exports = Savequestion; // ส่งออกคลาส RegisterUser เพื่อให้สามารถนำไปใช้ในส่วนอื่นของแอปพลิเคชันได้
