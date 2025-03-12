class UpdateFriend {
    constructor(closefriendService) {
        this.closefriendService = closefriendService;
    }

    async execute(dto) {
        const { UserID, friendid, status } = dto;
        try {
            // ตรวจสอบว่าสถานะที่ส่งมาถูกต้อง
            if (!['accepted', 'refuse'].includes(status)) {
                throw new Error("Invalid status");
            }
            const existingRequest = await this.closefriendService.checkrequest(UserID, friendid);
            if (status === 'accepted'){
                if (existingRequest?.Status === 'accepted'){
                    throw new Error("We are already friends.");
                }else{
                    await this.closefriendService.updatefriend(UserID, friendid, status);
                }
            }else{
                if (!existingRequest){
                    throw new Error("This friend is not in the system.");
                }else{
                    await this.closefriendService.deletefriend(UserID, friendid);
                }
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UpdateFriend;