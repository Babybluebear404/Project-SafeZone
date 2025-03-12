class GetAcceptedFriend {
    constructor(closefriendService) {
        this.closefriendService = closefriendService;
    }

    async execute(dto) {
        const { UserID } = dto;
        try {
            const row = await this.closefriendService.getpending(UserID);
            if (!row){
                throw new Error("No pending friends found.");
            }
            return row;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = GetAcceptedFriend;