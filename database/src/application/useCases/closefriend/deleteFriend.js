class DeleteFriend {
    constructor(closefriend) {
        this.closefriend = closefriend;
    }

    async execute(dto) {
        const { UserID , friendid} = dto;

        try {
            const existingRequest = await this.closefriend.checkrequest(UserID, friendid);
            if (!existingRequest){
                throw new Error("This friend request does not exist.");
            }

            if (existingRequest.Status !== 'accepted') {
                throw new Error("You are not friends with this user.");
            }
            await this.closefriend.deletefriend(UserID, friendid);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = DeleteFriend;