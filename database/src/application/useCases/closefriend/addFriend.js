class AddFriend {
    constructor(closefriendService) {
        this.closefriendService = closefriendService;
    }

    async execute(dto) {
        const { UserID, friendid} = dto;
        try {
            
            if(UserID == friendid){
                throw new Error("Can't add myself");
            }
            const existingRequest = await this.closefriendService.checkrequest(UserID, friendid);
            if (existingRequest?.Status === 'pending') {
                throw new Error("Friend request already sent");
            }else if(existingRequest?.Status === 'accepted') {
                throw new Error("You are already friends");
            }
            await this.closefriendService.saveadd(UserID, friendid);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = AddFriend;