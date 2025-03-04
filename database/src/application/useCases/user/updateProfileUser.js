class UpdateProfile{
    constructor(userService) {
        this.userService = userService;
    }

    async execute(dto){
        const { username } = dto;
        try{

        }catch(error){
            throw error;
        }
    }
}

module.exports = UpdateProfile;