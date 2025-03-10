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

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/html/book.html'));
})

app.use((req, res) => {
  res.status(404).send('<h1>PAGE NOT FOUND</h1>');
})

app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});

// 📂 project-root
//  ├── 📂config
//  │    ├── database.js
//  ├── 📂 controllers
//  │    ├── book.controller.js  ⬅️ Xử lý request, gọi service
//  │    ├── category.controller.js
//  │    ├── review.controller.js
//  ├── 📂 services
//  │    ├── book.service.js  ⬅️ Chứa logic lấy dữ liệu từ database
//  │    ├── category.service.js
//  │    ├── review.service.js
//  ├── 📂 routers
//  │    ├── book.routes.js  ⬅️ Định nghĩa endpoint
//  │    ├── category.routes.js
//  │    ├── review.routes.js
//  ├── 📂 public
//  │    ├── 📂 html
//  │    │    ├── book.html
//  │    │    ├── category.html
//  │    │    ├── review.html
//  │    ├── 📂 css
//  │    │    ├── book.css
//  │    │    ├── category.css
//  │    │    ├── review.css
//  │    ├── 📂 js
//  │    │    ├── book.js
//  │    │    ├── category.js
//  │    │    ├── review.js
//  ├── 📂 middlewares
//  │    ├── book.middleware.js  ⬅️ (Tùy chọn) Middleware xử lý filter
//  │    ├── category.middleware.js
//  ├── 📂 node_modules
//  ├── 📜 pakage-lock.js
//  ├── 📜 package.json
//  ├── 📜 server.js  ⬅️ Chạy server