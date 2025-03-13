class Getquestion {
    constructor(questionService) {
        this.questionService = questionService; // กำหนดค่า questionService ที่จะใช้ในการดำเนินการต่างๆ เกี่ยวกับผู้ใช้
    }

    async execute(dto) {
        const { UserID } = dto; // ดึงค่าจาก DTO (Data Transfer Object)

        try {
            return await this.questionService.questionsbyid(UserID);
        } catch (error) {
            throw error; // โยนข้อผิดพลาดไปให้ผู้เรียกใช้จัดการต่อ
        }
    }
}

module.exports = Getquestion; // ส่งออกคลาส RegisterUser เพื่อให้สามารถนำไปใช้ในส่วนอื่นของแอปพลิเคชันได้
