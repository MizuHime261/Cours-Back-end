const express = require('express');
const dotenv = require("dotenv");
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const jobRoutes = require('./routers/job.routes');
const categoryRoutes = require('./routers/category.routes');



const app = express();
const PORT = process.env.PORT || 3000;

// Middleware logging
app.use(morgan('combined'));

// Cấu hình static file
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public/html')));

// Middleware xử lý JSON & form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routesnode
app.use('/jobs', jobRoutes);
app.use('/categories', categoryRoutes);


app.use((req, res) => {
  res.status(404).send('<h1>PAGE NOT FOUND</h1>');
})

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});

// 📂 project-root
//  ├── 📂config
//  │    ├── database.js
//  ├── 📂 controllers
//  │    ├── job.controller.js  ⬅️ Xử lý request, gọi service
//  ├── 📂 services
//  │    ├── job.service.js  ⬅️ Chứa logic lấy dữ liệu từ database
//  ├── 📂 routers
//  │    ├── job.routes.js  ⬅️ Định nghĩa endpoint
//  ├── 📂 middlewares
//  │    ├── job.middleware.js  ⬅️ (Tùy chọn) Middleware xử lý filter
//  ├── 📂 node_modules
//  ├── 📜 pakage-lock.js
//  ├── 📜 package.json
//  ├── 📜 server.js  ⬅️ Chạy server