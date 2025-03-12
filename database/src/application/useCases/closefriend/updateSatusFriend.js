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
            if (status === 'accepted'){
                await this.closefriendService.updatefriend(UserID, friendid, status);
            }else{
                await this.closefriendService.deletefriend(UserID, friendid);
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UpdateFriend;