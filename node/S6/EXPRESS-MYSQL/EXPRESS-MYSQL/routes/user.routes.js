const express = require('express'); // ✅ Sửa lỗi chính tả
const router = express.Router();
const db=require('../database/database');

// Get one user
router.get('/:id', (req, res) => {
    let id=req.params.id;
    db.execute('SELECT * FROM user WHERE id = ?', [id])
    .then(function(data){
        res.json(data[0]);
    })
    .catch(function(err){
        console.log(err);
    })
});

// Get all users
router.get('/', (req, res) => {
    // Kết nối MySQL
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '123456',
//     database: 'mysql2_demo',
//     port: 3307
// });
// connection
// .then(function(results) {
//     let data=results.query('SELECT * FROM user');
//     return data;
// })//promise
// .then(function(data){
//     res.json(data[0]);
// })
// .catch(function(err){
//     console.log(err);
// })
// console.log(connection);
// connection.connect((err) => {
//     if (err) {
//         console.error('Lỗi kết nối MySQL:', err);
//     } else {
//         console.log('Đã kết nối MySQL');
//     }
// });
// connection.end();
db.query('SELECT * FROM user')
.then(function(data){
    res.json(data[0]);
})
.catch(function(err){
    console.log(err);
})
console.log(result);
});

// Post a new user
router.post('/', (req, res) => {
    let username=req.body.username;
    let email=req.body.email;
    let password=req.body.password;
    db.execute( 'INSERT INTO user (username, email, password) VALUES (?, ?, ?)', [username, email, password])
    .then(function(data){
        res.json({
            message: 'Thêm mới thành công',
            insertId:data[0].insertId,
        });
        
    })
    .catch(function(err){
        console.log(err);
    })
});

// Update a user
router.put('/:id', (req, res) => {
    let id = req.params.id;
    let username = req.body.username;
    db.execute('UPDATE user SET username = ? WHERE id = ?', [username, id])
    .then(function(data){
        res.json({
            message: 'Cập nhật thành công',
            
        });
    })
    .catch(function(err){
        console.log(err);
    })
    
});

// Delete a user
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    db.execute('DELETE FROM user WHERE id = ?', [id])
    .then(function(data){
        res.json({
            message: 'Xóa thành công',
            
        });
    })
    .catch(function(err){
        console.log(err);
    })
      
});

module.exports = router; // ✅ Xuất router đúng cách
