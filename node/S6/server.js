// npm init
//npm install -g nodemon
//npm install express
//npm install nodemon
//npm install body-parser
//npm install -g json-server
//npm i morgan
// npm run dev
const express = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const userRouter = require('./routers/user.routes.js');

const app = express();
const port = 3000;

// Middleware logging
app.use(morgan('combined'));

// Cấu hình static file
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public/html')));

// Middleware xử lý JSON & form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/users', userRouter);

app.get('/', (req, res) => {
    res.send('hello');
});

// Middleware xử lý lỗi 404
app.use((req, res, next) => {
    res.status(404).json({ message: "Route không tồn tại" });
});

// Lắng nghe cổng
app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});