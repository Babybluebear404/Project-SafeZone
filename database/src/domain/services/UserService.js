const User = require('../entities/user');
const getuuid = require('../../utils/uuid/getuuid');
const { hashPassword } = require('../../utils/uuid/hashPassword');
const newToken = require('../../utils/uuid/newToken');

class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async login(id, email){
        const newtoken = newToken(id, email);
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

    async findUserById(id){
        return this.userRepository.findUserById(id);
    }
}

module.exports = UserService;
