const express = require('express'); // ✅ Sửa lỗi chính tả
const port = 3000;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const server = express();
const userRoutes = require('./routes/user.routes');

server.use(express.static('public'));
server.use(morgan('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// Sử dụng endpoint userRoutes
server.use('/users', userRoutes); // ✅ Thêm prefix

server.get('/', (req, res) => {
    res.json({
        message: 'Hello World'
    });  
});

server.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
