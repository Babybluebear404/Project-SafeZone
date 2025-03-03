const axios = require('axios');
const jwt = require('jsonwebtoken');
const fs = require("fs");

const USERS_FILE = "D:/Thesis/web/Project-SafeZone/database/users.json";

// โหลดข้อมูลผู้ใช้จากไฟล์ JSON
const loadUsers = () => {
    try {
        const data = fs.readFileSync(USERS_FILE, "utf8");
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

// บันทึกข้อมูลผู้ใช้ลงไฟล์ JSON
const saveUsers = (users) => {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf8");
};

async function googleLogin(access_token) {
    try {
        // ดึงข้อมูลผู้ใช้จาก Google
        const { data: userData } = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);

        // ตรวจสอบว่าผู้ใช้มีอยู่แล้วหรือไม่
        let user = loadUsers().find((u) => u.email === userData.email);

        // สร้างบัญชีใหม่ถ้าไม่พบ
        if (!user) {
            user = { name: userData.name, email: userData.email, password: null };
            saveUsers([...loadUsers(), user]);
        }

        // สร้าง JWT token
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

        return { user, token };
    } catch (error) {
        throw new Error("Google Login failed");
    }
}

module.exports = googleLogin;
