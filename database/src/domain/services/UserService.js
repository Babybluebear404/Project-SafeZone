const User = require('../entities/user');
const getuuid = require('../../utils/uuid/getuuid');
const hashPassword = require('../../utils/bcrypt/hashPassword');
const comparePassword = require('../../utils/bcrypt/comparePassword');
const newToken = require('../../utils/jwt/newToken');

class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async findUserByEmail(email) {
        return this.userRepository.findByEmail(email);
    }

    async getUserById(UserID) {
        console.log(UserID);
        return this.userRepository.findUserById(UserID);
    }

    async login(password, existingUser){
        await comparePassword(password, existingUser.Passwords);
        const newtoken = newToken(existingUser.ID, existingUser.Email);
        return newtoken;
    }

    async register(username, email, password) {
        const userId = getuuid();
        const hashpassword = await hashPassword(password);
        const user = new User(userId, username, email, hashpassword);
        await this.userRepository.save(user); // บันทึกผู้ใช้ในฐานข้อมูล
        return user;
    }

    async forgot(existingUser){
        const resetToken = crypto.randomBytes(32).toString("hex");
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 ชั่วโมง
        await user.save();
        const user = new User(userId, username, email, hashpassword);
        await this.userRepository.save(user);
    }
}

module.exports = UserService;
