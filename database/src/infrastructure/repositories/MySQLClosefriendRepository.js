class MySQLClosefriendRepository{
    constructor(connection){
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
        WHERE ((UserID = ? AND FriendID = ?) OR (UserID = ? AND FriendID = ?))
        AND Status = 'pending'`;
       await this.connection.query(query, [
           upstatus.status, 
           upstatus.userid, 
           upstatus.friendid,
           upstatus.friendid,
           upstatus.userid
       ]);
    }

    async getpendingFriend(userId){
        const query = `
                SELECT DISTINCT u.id, u.username, u.email, u.profile
                FROM closefriend f
                JOIN users u ON u.ID = f.UserID
                WHERE f.Status = 'pending'
                AND f.FriendID = ?
                AND u.ID != ?`;
        const [rows] = await this.connection.query(query, [userId, userId]);
        return rows;
    }

    async getacceptedFriend(userId){
        const query = `
                SELECT DISTINCT u.id, u.username, u.email, u.profile
                FROM closefriend f
                JOIN users u ON u.ID = 
                    CASE 
                        WHEN f.UserID = ? THEN f.FriendID 
                        ELSE f.UserID 
                    END
                WHERE f.Status = 'accepted'
                AND (f.UserID = ? OR f.FriendID = ?)
                AND u.ID != ?`;
        const [rows] = await this.connection.query(query, [userId, userId, userId, userId]);
        return rows;
    }

    async getAllStatusFriend(userId) {
        const query = `
            SELECT DISTINCT 
                CASE 
                    WHEN f.UserID = ? THEN f.FriendID 
                    ELSE f.UserID 
                END as friend_id,
                f.Status
            FROM closefriend f
            WHERE (f.Status = 'accepted' OR f.Status = 'pending')
            AND (f.UserID = ? OR f.FriendID = ?)`;
        const [rows] = await this.connection.query(query, [userId, userId, userId]);
        return rows;
    }
}

module.exports = MySQLClosefriendRepository;