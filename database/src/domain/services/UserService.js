const User = require('../entities/user');
const getuuid = require('../../utils/uuid/getuuid');
const hashPassword = require('../../utils/bcrypt/hashPassword');
const comparePassword = require('../../utils/bcrypt/comparePassword');
const newToken = require('../../utils/jwt/newToken');
const newTokenreset = require('../../utils/jwt/newTokenforgot');

class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async findUserByEmail(email) {
        return this.userRepository.findByEmail(email);
    }

    async findUserById(UserID) {
        return this.userRepository.findById(UserID);
    }

    async login(password, existingUser) {
        if (password) {
            await comparePassword(password, existingUser.passwords);
        }
        const newtoken = newToken(existingUser.id, existingUser.email);
        return newtoken;
    }


    async register(username, email, password) {
        const userId = getuuid();
        const hashpassword = password ? await hashPassword(password) : null;
        const user = new User(userId, username, email, hashpassword);
        await this.userRepository.save(user);
    }

    async forgot(existingUser){
        const newtoken = newTokenreset(existingUser.id, existingUser.email);
        return newtoken;
    }

    async change(id, password){
        const hashpassword = await hashPassword(password);
        await this.userRepository.upDatePassword(id, hashpassword);
    }

    async getUserProfile(userid){
        return await this.userRepository.getProfile(userid);
    }

    async updateUserProfile(userid, newusername, profile){
        await this.userRepository.upDateProfile(userid, newusername, profile);
    }
}

module.exports = UserService;
