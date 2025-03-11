class GetAcceptedFriend {
    constructor(closefriend) {
        this.closefriend = closefriend;
    }

    async execute(dto) {
        const { UserID } = dto;
        try {
            const row = await this.closefriend.getaccepted(UserID);
            if (!row){
                throw new Error("No accepted friends found.");
            }
            return row;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = GetAcceptedFriend;