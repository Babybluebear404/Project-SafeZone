const PasswordError = require('../domainErrors/PasswordError');

class Checkpassword {
    constructor(password, passwordConfirm) {
        if (password !== passwordConfirm) {
            throw new PasswordError(); // โยน error ถ้ารหัสผ่านไม่ตรงกัน
        }
        this.password = password; // เก็บรหัสผ่านที่ตรวจสอบแล้ว
    }
}

module.exports = Checkpassword;