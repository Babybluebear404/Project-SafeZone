class Profile{
    constructor(userService) {
        this.userService = userService;
    }

    async execute(dto) {
        const { UserID } = dto;
        // เรียกใช้ userService เพื่อนำข้อมูลผู้ใช้ตาม userId
        try{
            const user = await this.userService.getUserProfile(UserID);
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        }catch(error){
            throw error;
        }
    }
}

module.exports = Profile;