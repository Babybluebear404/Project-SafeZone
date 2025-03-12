class UpdateProfile{
    constructor(userService) {
        this.userService = userService;
    }

    async execute(dto){
        const { UserID, newusername, profile} = dto;
        try{
            await this.userService.updateUserProfile(UserID, newusername, profile);
        }catch(error){
            throw error;
        }
    }
}

module.exports = UpdateProfile;