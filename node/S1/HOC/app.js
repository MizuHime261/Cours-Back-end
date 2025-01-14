const { createServer } = require('node:http');
const fs = require('fs'); // Import module fs

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
    res.statusCode = 200;
    // Đặt Content-Type với charset UTF-8
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    
    if (req.url === "/") {
        res.end("<h1>Trang Chủ</h1>");
    } else if (req.url === "/users") {
        res.end("<h1>Người dùng</h1>");
    } else {
        res.end("<h1>404 Không Tìm Thấy</h1>");
    }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});