const { comparePassword } = require('../../utils/uuid/hashPassword');

class login{
    constructor(userService) {
        this.userService = userService; // กำหนดค่า userService ที่จะใช้ในการดำเนินการต่างๆ เกี่ยวกับผู้ใช้
    }

    async execute(dto){
        const { email, password } = dto

        try{
            const existingUser = await this.userService.findUserByEmail(email); // ค้นหาผู้ใช้จากอีเมล
            if (!existingUser) {
                throw new Error('No Email');
            }
            const comparepassword = await comparePassword(password, existingUser.Passwords);
            if (!comparepassword) {
                throw new Error('No password');
            }
            const token = await this.userService.login(existingUser.ID, existingUser.Email);
            return token;
        }catch(error){
            console.error("Error occurred: ", error.message); 
            throw error;
        }
    }
}

module.exports = login;