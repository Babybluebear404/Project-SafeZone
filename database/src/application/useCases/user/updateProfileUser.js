class UpdateProfile{
    constructor(userService) {
        this.userService = userService;
    }

    async execute(dto){
        const { UserID, newusername } = dto;
        try{
            await this.userService.updateUserProfile(UserID, newusername);
        }catch(error){
            throw error;
        }
    }
}

module.exports = UpdateProfile;