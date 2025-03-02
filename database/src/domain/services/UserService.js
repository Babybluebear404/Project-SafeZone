const User = require('../entities/user');
const getuuid = require('../../utils/uuid/getuuid');
const hashPassword = require('../../utils/bcrypt/hashPassword');
const comparePassword = require('../../utils/bcrypt/comparePassword');
const newToken = require('../../utils/jwt/newToken');

class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
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

    async findUserByEmail(email) {
        return this.userRepository.findByEmail(email);
    }
}

module.exports = UserService;
