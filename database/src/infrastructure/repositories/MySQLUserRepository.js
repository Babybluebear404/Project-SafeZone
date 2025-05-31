class MySQLUserRepository {
    constructor(connection) {
        this.connection = connection;  // ควรใช้ connection ที่มาจาก mysql2/promise
    }

    async save(user) {
        const query = 'INSERT INTO users (id, username, email, passwords, profile) VALUES (?, ?, ?, ?, ?)';
        // ใช้ connection ที่รองรับ promise โดยไม่ต้องใช้ .promise() อีก
        await this.connection.query(query, [user.id, user.username, user.email, user.password, user.profile]);
    }   

    async findByEmail(email) {
        const query = 'SELECT id, email, passwords FROM users WHERE email = ?';
        const [rows] = await this.connection.query(query, [email]);
        return rows[0];  // คืนค่าผู้ใช้ที่ตรงกับอีเมล
    }

    async findById(UserID) {
        const query = 'SELECT id FROM users WHERE id = ?';
        const [user] = await this.connection.query(query, [UserID]);
        return user[0];
    }

    async getAllUsers(currentUserId) {
        const query = 'SELECT id, username, email, profile FROM users WHERE id != ?';
        const [users] = await this.connection.query(query, [currentUserId]);
        return users;
    }

    async getProfile(UserID) {
        const query = 'SELECT id, username, email, profile FROM users WHERE id = ?';
        const [user] = await this.connection.query(query, [UserID]);
        return user[0];
    }

    async upDatePassword(userId, hashedPassword) {
        const sql = 'UPDATE users SET passwords = ? WHERE id = ?';
        await this.connection.query(sql, [hashedPassword, userId]);
    }

    async upDateProfile(userId, newusername, profile) {
        const sql = 'UPDATE users SET username = ?, profile = ? WHERE id = ?';
        await this.connection.query(sql, [newusername, profile, userId]);
    }
}

module.exports = MySQLUserRepository;
