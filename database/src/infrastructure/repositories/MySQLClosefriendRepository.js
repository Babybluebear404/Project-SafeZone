const ClosefriendRepository = require("../../domain/repositories/closefriendRepository");


class MySQLClosefriendRepository extends ClosefriendRepository{
    constructor(connection){
        super();
        this.connection = connection; // ควรใช้ connection ที่มาจาก mysql2/promise
    }

    async checkfriendstatus(userid, friendid){
        const query = `SELECT Status FROM closefriend 
            WHERE LEAST(UserID, FriendID) = LEAST(?, ?) 
            AND GREATEST(UserID, FriendID) = GREATEST(?, ?)`;
        const [rows] = await this.connection.query(query, [userid, friendid, userid, friendid]);
        return rows[0];
    }

    async addFriend(closefriend){
        const query = 'INSERT INTO closefriend (UserID, FriendID, Status) VALUES (?, ?, ?)';
        await this.connection.query(query, [closefriend.userid, closefriend.friendid, closefriend.status]);
    }
    
    async delete(userId, friendId){
        const query = `DELETE FROM closefriend WHERE 
                      ((UserID = ? AND FriendID = ?) OR (UserID = ? AND FriendID = ?)) 
                      `;
        await this.connection.query(query, [userId, friendId, friendId, userId]);
    }

    async updateSatus(upstatus){
       const query = `
        UPDATE closefriend 
        SET Status = ? 
        WHERE UserID = ? 
        AND FriendID = ? 
        AND Status = 'pending'`;
       await this.connection.query(query, [upstatus.status, upstatus.userid, upstatus.friendid]);
    }

    async getFriend(userId){
        const query = `
            SELECT u.ID, u.Username, u.Email
            FROM closefriend f
            JOIN users u ON (u.id = f.friendID OR u.id = f.userID)
            WHERE (f.userID = ? OR f.friendID = ?) 
            AND f.status = 'accepted'
            AND u.id != ?`;
        return await this.connection.query(query, [userId, userId, userId])
    }

    async getpending(userId){
        const query = `
            SELECT u.ID, u.Username, u.Email
            FROM closefriend f
            JOIN users u ON (u.id = f.friendID OR u.id = f.userID)
            WHERE (f.userID = ? OR f.friendID = ?) 
            AND f.status = 'pending'
            AND u.id != ?`;
        return await this.connection.query(query, [userId, userId, userId])
    }
}

module.exports = MySQLClosefriendRepository;