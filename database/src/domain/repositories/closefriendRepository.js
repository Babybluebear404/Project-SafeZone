class ClosefriendRepository{
    async addFriend(closefriend){
        throw new Error("Method 'addFriend' must be implemented.");
    }
    
    async delete(userid, friendid){
        throw new Error("Method 'delete' must be implemented.");
    }

    async updateSatus(userid, friendid){
        throw new Error("Method 'updateSatus' must be implemented.");
    }
}

module.exports = ClosefriendRepository;