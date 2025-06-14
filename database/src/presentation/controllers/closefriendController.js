const Addfriend = require('../../application/useCases/closefriend/addFriend');
const DeleteFriend = require('../../application/useCases/closefriend/deleteFriend');
const GetAcceptedFriend = require('../../application/useCases/closefriend/GetAcceptedFriend');
const GetPendingFriend = require('../../application/useCases/closefriend/GetPendingFriend');
const UpdateFriend = require('../../application/useCases/closefriend/updateSatusFriend');
const getAllStatusFriend = require('../../application/useCases/closefriend/getAllStatusFriend');
class friendController{
    constructor(closefriendService){
        this.closefriendService = closefriendService;
        this.addfrienduseCaes = new Addfriend(closefriendService);
        this.updatefrienduseCaes = new UpdateFriend(closefriendService);
        this.deletefrienduseCaes = new DeleteFriend(closefriendService);
        this.getacceptedfrienduseCaes = new GetAcceptedFriend(closefriendService);
        this.getpendingfrienduseCaes = new GetPendingFriend(closefriendService);
        this.getAllStatusFrienduseCaes = new getAllStatusFriend(closefriendService);
    }

    async addfriend(req, res){
        try{
            const dto = {
                ...req.body,
                UserID: req.user.id
            };
            await this.addfrienduseCaes.execute(dto);
            res.status(201).json({
                success: true,
                message: "Friend request sent"
            });
        }catch(error){
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }

    async updatestatus(req, res){
        try{
            const { friendid, status } = req.body;
            
            // ตรวจสอบว่ามีข้อมูลที่จำเป็นครบหรือไม่
            if (!friendid || !status) {
                return res.status(400).json({
                    success: false,
                    error: "Missing required fields: friendid and status"
                });
            }

            // ตรวจสอบว่า status ถูกต้อง
            if (!['accepted', 'refuse'].includes(status)) {
                return res.status(400).json({
                    success: false,
                    error: "Invalid status. Status must be either 'accepted' or 'refuse'"
                });
            }

            const dto = {
                friendid,
                status,
                UserID: req.user.id
            };

            await this.updatefrienduseCaes.execute(dto);
            
            res.status(200).json({ 
                success: true,
                message: status === 'accepted' ? "Friend request accepted" : "Friend request refused"
            });
        }catch(error){
            res.status(500).json({
                success: false,
                error: error.message 
            });
        }
    }

    async deletefriend(req, res){
        try{
            const dto = {
                ...req.body,
                UserID: req.user.id
            };
            await this.deletefrienduseCaes.execute(dto);
            res.status(201).json({
                success: true,
                message: "Successfully Delete"
            });
        }catch(error){
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }

    async getaccepted(req, res){
        try{
            const dto = {
                UserID: req.user.id
            };
            const users = await this.getacceptedfrienduseCaes.execute(dto);
            const friends = users.map(user => ({
                id: user.id,
                username: user.username,
                email: user.email,
                profile: user.profile || null
            }));
            res.status(201).json({
                success: true,
                data: friends
            }); 
        }catch(error){
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }

    async getpending(req, res){
        try{
            const dto = {
                UserID: req.user.id
            };
            const users = await this.getpendingfrienduseCaes.execute(dto);
            const friends = users.map(user => ({
                id: user.id,
                username: user.username,
                email: user.email,
                profile: user.profile || null
            }));
            res.status(201).json({
                success: true,
                data: friends
            }); 
        }catch(error){
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }

    async getAllStatusFriend(req, res){
        try{
            const dto = {
                UserID: req.user.id
            };
            const users = await this.getAllStatusFrienduseCaes.execute(dto);
            res.status(201).json({
                success: true,
                data: users
            });
        }catch(error){
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }
}

module.exports = friendController;