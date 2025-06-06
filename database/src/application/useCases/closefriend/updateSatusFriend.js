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
            if (!existingRequest) {
                throw new Error("No friend request found");
            }

            if (status === 'accepted') {
                if (existingRequest.Status === 'accepted') {
                    throw new Error("We are already friends.");
                }
                await this.closefriendService.updatefriend(UserID, friendid, status);
            } else {
                await this.closefriendService.deletefriend(UserID, friendid);
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UpdateFriend;