class GetUserById {
    constructor(closefriendService) {
        this.closefriendService = closefriendService;
    }

    async execute(dto) {
        const { UserID } = dto;
        try {
            const users = await this.closefriendService.getpending(UserID);
            if (!users) {
                throw new Error("No pending friends found.");
            }
            return users;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = GetUserById;
