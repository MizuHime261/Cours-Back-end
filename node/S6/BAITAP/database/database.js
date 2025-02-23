const fs = require('fs').promises;
const mysql = require('mysql2/promise');

// Tạo pool kết nối đến MySQL
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'dev_data_db',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;