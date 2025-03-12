class DeleteFriend {
    constructor(closefriendService) {
        this.closefriendService = closefriendService;
    }

    async execute(dto) {
        const { UserID , friendid} = dto;

        try {
            const existingRequest = await this.closefriendService.checkrequest(UserID, friendid);
            if (!existingRequest){
                throw new Error("This friend request does not exist.");
            }

            if (existingRequest.Status !== 'accepted') {
                throw new Error("You are not friends with this user.");
            }
            await this.closefriendService.deletefriend(UserID, friendid);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = DeleteFriend;