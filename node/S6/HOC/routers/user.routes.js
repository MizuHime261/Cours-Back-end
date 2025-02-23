const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise'); // Dùng promise cho MySQL
const db = require('../database/database.js');

// // Kết nối MySQL
// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '123456',
//     database: 'user_db',
//     port: 3306,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });

// API lấy danh sách users từ MySQL
// router.get('/', async (req, res) => {
//     try {
//         const [results] = await db.query('SELECT * FROM users');
//         res.status(200).json(results);
//     } catch (err) {
//         res.status(500).json({ message: "Lỗi lấy dữ liệu", error: err.message });
//     }
// });

// // API lấy user theo ID
// router.get('/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         const [results] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
//         if (results.length === 0) {
//             return res.status(404).json({ message: "Không tìm thấy user" });
//         }
//         res.status(200).json(results[0]);
//     } catch (err) {
//         res.status(500).json({ message: "Lỗi lấy dữ liệu", error: err.message });
//     }
// });

// // API thêm user mới
// router.post('/', async (req, res) => {
//     const { username, email, password } = req.body;
//     if (!username || !email || !password) {
//         return res.status(400).json({ message: "Thiếu thông tin bắt buộc" });
//     }

//     try {
//         const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
//         const [result] = await pool.query(sql, [username, email, password]);
//         res.status(201).json({ message: "User đã được tạo", id: result.insertId });
//     } catch (err) {
//         res.status(500).json({ message: "Lỗi khi thêm user", error: err.message });
//     }
// });

// // API cập nhật thông tin user
// router.put('/:id', async (req, res) => {
//     const { id } = req.params;
//     const { username, email, password } = req.body;

//     try {
//         const sql = "UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?";
//         const [result] = await db.query(sql, [username, email, password, id]);

//         if (result.affectedRows === 0) {
//             return res.status(404).json({ message: "Không tìm thấy user" });
//         }
//         res.status(200).json({ message: "User đã được cập nhật" });
//     } catch (err) {
//         res.status(500).json({ message: "Lỗi khi cập nhật user", error: err.message });
//     }
// });

// // API xóa user
// router.delete('/:id', async (req, res) => {
//     const { id } = req.params;

//     try {
//         const sql = "DELETE FROM users WHERE id = ?";
//         const [result] = await db.query(sql, [id]);

//         if (result.affectedRows === 0) {
//             return res.status(404).json({ message: "Không tìm thấy user" });
//         }
//         res.status(200).json({ message: "User đã bị xóa" });
//     } catch (err) {
//         res.status(500).json({ message: "Lỗi khi xóa user", error: err.message });
//     }
// });

router.get('/', (req, res) => {
    db.query('SELECT * FROM users')
        .then(([results]) => res.status(200).json(results))
        .catch(err => res.status(500).json({ message: "Lỗi lấy dữ liệu", error: err.message }));
});

// API lấy user theo ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM users WHERE id = ?', [id])
        .then(([results]) => {
            if (results.length === 0) {
                return res.status(404).json({ message: "Không tìm thấy user" });
            }
            res.status(200).json(results[0]);
        })
        .catch(err => res.status(500).json({ message: "Lỗi lấy dữ liệu", error: err.message }));
});

// API thêm user mới
router.post('/', (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: "Thiếu thông tin bắt buộc" });
    }

    const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.query(sql, [username, email, password])
        .then(([result]) => res.status(201).json({ message: "User đã được tạo", id: result.insertId }))
        .catch(err => res.status(500).json({ message: "Lỗi khi thêm user", error: err.message }));
});

// API cập nhật thông tin user
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;

    const sql = "UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?";
    db.query(sql, [username, email, password, id])
        .then(([result]) => {
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Không tìm thấy user" });
            }
            res.status(200).json({ message: "User đã được cập nhật" });
        })
        .catch(err => res.status(500).json({ message: "Lỗi khi cập nhật user", error: err.message }));
});

// API xóa user
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM users WHERE id = ?";
    db.query(sql, [id])
        .then(([result]) => {
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Không tìm thấy user" });
            }
            res.status(200).json({ message: "User đã bị xóa" });
        })
        .catch(err => res.status(500).json({ message: "Lỗi khi xóa user", error: err.message }));
});

module.exports = router;