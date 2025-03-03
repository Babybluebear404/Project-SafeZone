const QestionRepository = require('../../domain/repositories/questionRepository');

class MySQLquestionRepository extends QestionRepository {
    constructor(connection) {
        super();
        this.connection = connection;  // ควรใช้ connection ที่มาจาก mysql2/promise
    }

    async save(ques) {
        const query = 'INSERT INTO questionnaire (id, userid, Q2test_score, Q9test_score, Q8test_score) VALUES (?, ?, ?, ?, ?)';
        await this.connection.query(query, [ques.id, ques.userid, ques.q2, ques.q9, ques.q8]);

    }
}

module.exports = MySQLquestionRepository;