class Checkpassword {
    constructor(password, passwordConfirm) {
        if (password !== passwordConfirm) {
            throw new Error("Passwords do not match!"); // โยน error ถ้ารหัสผ่านไม่ตรงกัน
        }
        this.password = password; // เก็บรหัสผ่านที่ตรวจสอบแล้ว
    }
}

module.exports = Checkpassword;