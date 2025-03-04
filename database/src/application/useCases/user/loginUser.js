class Login{
    constructor(userService) {
        this.userService = userService; // กำหนดค่า userService ที่จะใช้ในการดำเนินการต่างๆ เกี่ยวกับผู้ใช้
    }

    async execute(dto){
        const { email, password } = dto

        if (!email || !password) {
            throw new Error("Email and password are required");
        }

        try{
            const existingUser = await this.userService.findUserByEmail(email); // ค้นหาผู้ใช้จากอีเมล
            if (!existingUser) {
                throw new Error('Incorrect Email');
            }
            if (!password){
                throw new Error('Not Password');
            }
            const token = await this.userService.login(password, existingUser);
            return token;
        }catch(error){
            console.error("Error occurred: ", error.message); 
            throw error;
        }
    }
}

module.exports = Login;