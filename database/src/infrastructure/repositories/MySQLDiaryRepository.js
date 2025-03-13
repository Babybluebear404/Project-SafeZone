class MySQLDiaryRepository{
    constructor(connection){
        this.connection = connection; // ควรใช้ connection ที่มาจาก mysql2/promise
    }

    async save(diary){
        const query = `INSERT INTO diary (id, userid, story, feeling, aifeeling, sharestatus) VALUES (?, ?, ?, ?, ?, ?)`;
        await this.connection.query(query, [diary.id, diary.userid, diary.story, diary.feeling, diary.aifeeling, diary.sharestatus])
    }

    async updateStatus(userid, diaryid, status){
       const query = `
        UPDATE diary 
        SET sharestatus = ? 
        WHERE UserID = ? 
        AND ID = ?`;
       const [result] = await this.connection.query(query, [status,userid, diaryid]);
       return result;
    }

    async chackdiaryid(userid, diaryid){
        const query = `SELECT ID, UserID FROM diary 
        WHERE UserID = ? AND ID = ?;`;
        const [rows] = await this.connection.query(query,[userid, diaryid]);
        return rows[0];
    }

    async getDiary(userid, day){
        const query = `SELECT * FROM diary 
        WHERE UserID = ? AND DATE(date_and_time) = ?;`;
        const [rows] = await this.connection.query(query,[userid, day]);
        return rows; 
    }

    async shareDiary(userid) {
        const query = `
            SELECT DISTINCT d.ID, d.UserID, d.date_and_time, d.Story, d.Feeling, d.AIFeeling, d.ShareStatus
            FROM diary d
            JOIN closefriend f 
                ON (d.UserID = f.UserID OR d.UserID = f.FriendID)
            WHERE f.Status = 'accepted'
                AND d.ShareStatus = 1
                AND (f.UserID = ? OR f.FriendID = ?)
                AND d.UserID != ?;
        `;
        const [rows] = await this.connection.query(query, [userid, userid, userid]);
        return rows; 
    }

    async delete(userid, diaryid){
        const query = `DELETE FROM diary WHERE 
        UserID = ? AND ID = ?
        `;
        await this.connection.query(query, [userid, diaryid]);
    }

    async getFeelingsInDateRange(userId, startDate, endDate) {
        const query = `
            SELECT feeling, date_and_time FROM diary 
            WHERE UserID = ? AND date_and_time BETWEEN ? AND ?`;
        const [rows] = await this.connection.query(query, [userId, startDate, endDate]);
        return rows; // คืนค่ารายการ feeling เป็น array
    }

    async getAIFeelingsInDateRange(userId, startDate, endDate) {
        const query = `
            SELECT aifeeling, date_and_time FROM diary 
            WHERE UserID = ? AND date_and_time BETWEEN ? AND ?`;
        const [rows] = await this.connection.query(query, [userId, startDate, endDate]);
        return rows; // คืนค่ารายการ feeling เป็น array
    }
}

module.exports = MySQLDiaryRepository;