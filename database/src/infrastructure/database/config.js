const mysql = require("mysql2/promise");
require('dotenv').config();  // โหลดค่า .env

// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     port: process.env.DB_PORT,
//     waitForConnections: process.env.DB_WAITFORCONNECTIONS,
//     connectionLimit: process.env.DB_CONNECTIONLIMIT,
//     queueLimit: process.env.DB_QUEUELIMIT
// });

const pool = mysql.createPool({
  uri: process.env.DATABASE_URL,
  waitForConnections: process.env.DB_WAITFORCONNECTIONS,
  connectionLimit: process.env.DB_CONNECTIONLIMIT,  // ควบคุมจำนวน connection
  queueLimit: process.env.DB_QUEUELIMIT
});

module.exports = pool;
