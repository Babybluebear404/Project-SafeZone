const Closefriend = require("../entities/closefriend");
class ClosefriendService{
    constructor(closefriendRepository){
        this.closefriendRepository = closefriendRepository;
    }

    async checkrequest(UserID, friendId){
        return this.closefriendRepository.checkfriendstatus(UserID, friendId);
    }

    async saveadd(UserID, friendId){
        const friend =  new Closefriend(UserID, friendId);
        await this.closefriendRepository.addFriend(friend);
    }

    async updatefriend(UserID, friendid, status){
        const upstatus = new Closefriend(UserID, friendid, status);
        await this.closefriendRepository.updateSatus(upstatus);
    }

    async deletefriend(UserID, friend){
        await this.closefriendRepository.delete(UserID, friend);
    }

    async getaccepted(UserID){
        return await this.closefriendRepository.getacceptedFriend(UserID);
    }

    async getpending(UserID){
        return await this.closefriendRepository.getpendingFriend(UserID);
    }
    
    async getAllStatusFriend(UserID){
        return await this.closefriendRepository.getAllStatusFriend(UserID);
    }
}

module.exports = ClosefriendService;