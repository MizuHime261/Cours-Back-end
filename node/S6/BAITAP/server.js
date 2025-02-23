const express = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const userRoutes = require('./routers/user.routes');
const albumRoutes = require('./routers/album.routes');

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
app.use('/users', userRoutes);
app.use('/albums', albumRoutes);
app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});

// |data
// |_____albums.json
// |_____photo.json
// |_____users.json
// |database
// |_____users.js 
// |_____albums.js 
// |middlewares
// |node_modules
// |public
// |routers
// |_____user.routes.js
// |_____albums.routes.js 
// |package-lock.json
// |package.json
// |server.js
