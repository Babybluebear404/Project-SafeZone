class Questionnaire {
    constructor(id, userid, q2, q9 = null, q8 = null) {
        this.id = id;
        this.userid = userid;
        this.q2 = q2;
        this.q9 = q9;  // ถ้าไม่ได้รับ q9 จะใช้ค่า 0
        this.q8 = q8;  // ถ้าไม่ได้รับ q8 จะใช้ค่า 0
    }
}

module.exports = Questionnaire;
