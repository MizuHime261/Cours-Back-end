const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const userRoutes = require('./routers/user.routes');
const authRoutes = require('./routers/auth.routes');
const bookRoutes = require('./routers/book.routes');
const borrowRoutes = require('./routers/borrow.routes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();


const PORT = process.env.PORT || 3000;

// xử lý JSON và form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/users', userRoutes); 
app.use('/auth', authRoutes); 
app.use('/books', bookRoutes); 
app.use('/borrows', borrowRoutes);

// phục vụ tài liệu Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// xử lý lỗi 404 khi không tìm thấy route
app.use((req, res) => {
  res.status(404).send('<h1>PAGE NOT FOUND</h1>');
});

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});