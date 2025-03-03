const UserRepository = require('../../domain/repositories/UserRepository');

class MySQLUserRepository extends UserRepository {
    constructor(connection) {
        super();
        this.connection = connection;  // ควรใช้ connection ที่มาจาก mysql2/promise
    }

    async save(user) {
        const query = 'INSERT INTO users (id, username, email, passwords) VALUES (?, ?, ?, ?)';
        // ใช้ connection ที่รองรับ promise โดยไม่ต้องใช้ .promise() อีก
        await this.connection.query(query, [user.id, user.username, user.email, user.password]);
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

    async getById(UserID) {
        const query = 'SELECT id, username, email FROM users WHERE id = ?';
        const [user] = await this.connection.query(query, [UserID]);
        return user[0];
    }

    async upDatePassword(userId, hashedPassword) {
        const sql = 'UPDATE users SET passwords = ? WHERE id = ?';
        await this.connection.query(sql, [hashedPassword, userId]);
    }
}

module.exports = MySQLUserRepository;
