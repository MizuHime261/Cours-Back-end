const express = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const productRoutes = require('./routers/product.routes');
// const commentRoutes = require('./routers/comment.routes');
// const tagRoutes = require('./routers/tag.routes');


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
app.use('/products', productRoutes);
// app.use('/comments', commentRoutes);
// app.use('/tags', tagRoutes);


app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});

// |data
// |_____products.json
// |database
// |_____database.js 
// |middlewares
// |node_modules
// |public
// |routers
// |_____product.routes.js 
// |_____comment.routes.js
// |package-lock.json
// |package.json
// |server.js
// |seed.js