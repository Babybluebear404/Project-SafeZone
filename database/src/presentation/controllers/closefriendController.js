const Addfriend = require('../../application/useCases/closefriend/addFriend');
const DeleteFriend = require('../../application/useCases/closefriend/deleteFriend');
const GetAcceptedFriend = require('../../application/useCases/closefriend/getAcceptedFriend');
const GetPendingFriend = require('../../application/useCases/closefriend/getPendingFriend');
const UpdateFriend = require('../../application/useCases/closefriend/updateSatusFriend');
class friendController{
    constructor(friendService){
        this.addfrienduseCaes = new Addfriend(friendService);
        this.updatefrienduseCaes = new UpdateFriend(friendService);
        this.deletefrienduseCaes = new DeleteFriend(friendService);
        this.getacceptedfrienduseCaes = new GetAcceptedFriend(friendService);
        this.getpendingfrienduseCaes = new GetPendingFriend(friendService);
    }

    async addfriend(req, res){
        try{
            const dto = {
                ...req.body,
                UserID: req.user.id
            };
            await this.addfrienduseCaes.execute(dto);
            res.status(201).json({ message: "Friend request sent" });
        }catch(error){
            res.status(500).json({error: error.message});
        }
    }

    async updatestatus(req, res){
        try{
            const dto = {
                ...req.body,
                UserID: req.user.id
            };
            await this.updatefrienduseCaes.execute(dto);
            res.status(201).json({ message: "Successfully"});
        }catch(error){
            res.status(500).json({error: error.message});
        }
    }

    async deletefriend(req, res){
        try{
            const dto = {
                ...req.body,
                UserID: req.user.id
            };
            await this.deletefrienduseCaes.execute(dto);
            res.status(201).json({ message: "Successfully Delete"});
        }catch(error){
            res.status(500).json({error: error.message});
        }
    }

    async getaccepted(req, res){
        try{
            const dto = {
                UserID: req.user.id
            };
            const users = await this.getacceptedfrienduseCaes.execute(dto);
            res.status(201).json({
                friends: users.map(user => ({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                }))
            }); 
        }catch(error){
            res.status(500).json({error: error.message});
        }

    }

    async getpending(req, res){
        try{
            const dto = {
                UserID: req.user.id
            };
            const users = await this.getpendingfrienduseCaes.execute(dto);
            res.status(201).json({
                friends: users.map(user => ({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                }))
            }); 
        }catch(error){
            res.status(500).json({error: error.message});
        }

    }
}

module.exports = friendController;