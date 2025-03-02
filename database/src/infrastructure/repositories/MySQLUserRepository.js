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
        const [rows] = await this.connection.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];  // คืนค่าผู้ใช้ที่ตรงกับอีเมล
    }
}

module.exports = MySQLUserRepository;
