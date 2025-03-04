const express = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const bookRoutes = require('./routers/book.routes');
const categoryRoutes = require("./routers/category.routes");
const reviewRoutes = require("./routers/review.routes");



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

// Routesnode
app.use('/books', bookRoutes);
app.use("/categories", categoryRoutes);
app.use("/reviews", reviewRoutes);


app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});

// 📂 project-root
//  ├── 📂 controllers
//  │    ├── book.controller.js  ⬅️ Xử lý request, gọi service
//  ├── 📂 services
//  │    ├── book.service.js  ⬅️ Chứa logic lấy dữ liệu từ database
//  ├── 📂 routers
//  │    ├── book.routes.js  ⬅️ Định nghĩa endpoint
//  ├── 📂 config
//  │    ├── database.js  ⬅️ Cấu hình Knex
//  ├── 📂 middlewares
//  │    ├── filter.middleware.js  ⬅️ (Tùy chọn) Middleware xử lý filter
//  ├── 📜 server.js  ⬅️ Chạy server