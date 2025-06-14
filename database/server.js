const express = require('express');
const cors = require("cors");
const helmet = require('helmet');
const userRoutes = require('./src/presentation/routes/userRoutes');
const questionRoutes = require('./src/presentation/routes/questionRouter');
const closefriendRouters = require('./src/presentation/routes/closefriendRouter');
const diaryRouters = require('./src/presentation/routes/diaryRouter');
const otpRouters = require('./src/presentation/routes/otpRoutes');

const app = express();
const port = process.env.PORT || 3000; // ตั้งค่า default port

// ใช้งาน CORS และ Helmet
app.use(cors());
app.use(express.json());
app.use(helmet());

// ฟังก์ชันที่ช่วยป้องกัน SQL Injection
const preventSQLInjection = (req, res, next) => {
    const regex = /['";]/g; // ตรวจจับคำที่อาจจะใช้ในการโจมตี เช่น คำสั่ง SQL
    for (const key in req.body) {
        if (regex.test(req.body[key])) {
            return res.status(400).json({ error: 'SQL Injection detected!' });
        }
    }
    next();
};

// ฟังก์ชันที่ช่วยป้องกัน XSS
const preventXSS = (req, res, next) => {
    const regex = /<script.*?>.*?<\/script>/g; // ตรวจจับ script ปกติ
    const nestedScriptRegex = /<script.*?>.*?<script.*?>/g; // ตรวจจับ script ที่ซ้อนกัน

    for (const key in req.body) {
        // ตรวจจับสคริปต์จาก regex ทั้งสอง
        if (regex.test(req.body[key]) || nestedScriptRegex.test(req.body[key])) {
            return res.status(400).json({ error: 'XSS detected!' });
        }
    }
    next();
};

// ใช้ฟังก์ชันป้องกัน SQL Injection และ XSS ในทุก ๆ request
app.use(preventSQLInjection);
app.use(preventXSS);

// เชื่อมต่อกับ routes
app.use('/api/users', userRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/closefriends', closefriendRouters);
app.use('/api/diaries', diaryRouters);
app.use('/api/otps', otpRouters);

// เพิ่ม route / สำหรับตรวจสอบว่าทำงานอยู่
app.get('/', (req, res) => {
    res.send('API server is running.');
});

// เริ่มต้นเซิร์ฟเวอร์
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${port}`);
});


