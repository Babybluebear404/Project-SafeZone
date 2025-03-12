class MySQLDiaryRepository{
    constructor(connection){
        this.connection = connection; // ควรใช้ connection ที่มาจาก mysql2/promise
    }

    async save(diary){
        const query = `INSERT INTO diary (id, userid, story, feeling, aifeeling, sharestatus) VALUES (?, ?, ?, ?, ?, ?)`;
        await this.connection.query(query, [diary.id, diary.userid, diary.story, diary.feeling, diary.aifeeling, diary.sharestatus])
    }

    async chackdiaryid(userid, diaryid){
        const query = `SELECT ID, UserID FROM diary 
        WHERE UserID = ? AND ID = ?;`;
        const [rows] = await this.connection.query(query,[userid, diaryid]);
        return rows[0];
    }

    async getDiary(userid, day){
        const query = `SELECT * FROM diary 
        WHERE UserID = ? AND DATE(Data_and_Time) = ?;`;
        const [rows] = await this.connection.query(query,[userid, day]);
        return rows; 
    }

    async shareDiary(userid) {
        const query = `
            SELECT DISTINCT d.ID, d.UserID, d.Data_and_Time, d.Story, d.Feeling, d.AIFeeling, d.ShareStatus
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
}

module.exports = MySQLDiaryRepository;