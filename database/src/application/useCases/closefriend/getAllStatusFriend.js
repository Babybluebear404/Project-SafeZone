class getAllStatusFriend {
    constructor(closefriendService) {
        this.closefriendService = closefriendService;
    }

    async execute(dto) {
        const { UserID } = dto;

        if (!UserID) {
            throw new Error("UserID is required");
        }

        try {
            const users = await this.closefriendService.getAllStatusFriend(UserID);
            return users;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = getAllStatusFriend;