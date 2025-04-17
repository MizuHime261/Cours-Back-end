const express = require('express');
const router = express.Router();
const {
  handleGetAllBooks,
  handleGetBookById,
  handleCreateBook,
  handleUpdateBook,
  handleDeleteBook,
  searchBooks
} = require('../controllers/book.controller');

const { authenticate, authorize } = require('../middlewares/auth.middleware');

/**
 * @openapi
 * /books:
 *   get:
 *     tags:
 *       - Books
 *     summary: Lấy danh sách tất cả sách (có phân trang và có thể sắp xếp theo tên hoặc id)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Số trang muốn lấy (mỗi trang hiển thị 5 sách)
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *           enum: [id, title]
 *           default: id
 *         description: Trường để sắp xếp theo (mặc định là id, có thể chọn 'title' để sắp xếp theo tên sách)
 *       - in: query
 *         name: orderDirection
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: asc
 *         description: Hướng sắp xếp (mặc định là 'asc' - tăng dần)
 *     responses:
 *       200:
 *         description: Danh sách sách đã được lấy thành công (có phân trang, sắp xếp theo id hoặc title).
 *         content:
 *           application/json:
 *             example:
 *               books:
 *                 - id: 1
 *                   title: "Câu chuyện cổ tích"
 *                   author: "Nguyễn Văn A"
 *                   genre: "Truyện ngắn"
 *                   published_year: 2021
 *                   quantity: 10
 *                 - id: 2
 *                   title: "Hành trình khám phá"
 *                   author: "Trần Thị B"
 *                   genre: "Phiêu lưu"
 *                   published_year: 2020
 *                   quantity: 5
 *               currentPage: 1
 *               totalBooks: 20
 *               totalPages: 4
 *       401:
 *         description: Chưa xác thực hoặc token không hợp lệ
 *       500:
 *         description: Lỗi máy chủ khi lấy danh sách sách
 */
router.get('/', authenticate, authorize(['admin', 'book_manager']), handleGetAllBooks);

/**
 * @openapi
 * /books/search:
 *   get:
 *     tags:
 *       - Books
 *     summary: Tìm kiếm sách theo tiêu đề hoặc tác giả
 *     parameters:
 *       - in: query
 *         name: title
 *         required: false
 *         description: Tìm sách theo tiêu đề
 *         schema:
 *           type: string
 *       - in: query
 *         name: author
 *         required: false
 *         description: Tìm sách theo tác giả
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Danh sách sách phù hợp
 *         content:
 *           application/json:
 *             example:
 *               books:
 *                 - id: 1
 *                   title: "Harry Potter và Hòn đá Phù thủy"
 *                   author: "J.K. Rowling"
 *                   genre: "Fantasy"
 *                   published_year: 1997
 *                   quantity: 5
 *                 - id: 2
 *                   title: "Harry Potter và Phòng chứa Bí mật"
 *                   author: "J.K. Rowling"
 *                   genre: "Fantasy"
 *                   published_year: 1998
 *                   quantity: 3
 *       404:
 *         description: Không tìm thấy sách hoặc tác giải phù hợp
 *       500:
 *         description: Lỗi máy chủ khi tìm kiếm sách
 */
router.get('/search', searchBooks);

/**
 * @openapi
 * /books/{id}:
 *   get:
 *     tags:
 *       - Books
 *     summary: Lấy thông tin sách theo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của sách cần lấy thông tin
 *         schema:
 *           type: integer
 *           example: 1
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Thông tin sách
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               title: "Câu chuyện cổ tích"
 *               author: "Nguyễn Văn A"
 *               genre: "Truyện ngắn"
 *               published_year: 2021
 *               quantity: 10
 *       404:
 *         description: Không tìm thấy sách
 *       401:
 *         description: Chưa xác thực hoặc token không hợp lệ
 *       500:
 *         description: Lỗi máy chủ khi lấy thông tin sách
 */
router.get('/:id', authenticate, authorize(['admin', 'book_manager']), handleGetBookById);

/**
 * @openapi
 * /books:
 *   post:
 *     tags:
 *       - Books
 *     summary: Thêm sách mới
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *               - genre
 *               - published_year
 *               - quantity
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Cuộc sống kỳ diệu"
 *               author:
 *                 type: string
 *                 example: "Lê Minh T"
 *               genre:
 *                 type: string
 *                 example: "Triết lý"
 *               published_year:
 *                 type: integer
 *                 example: 2023
 *               quantity:
 *                 type: integer
 *                 example: 50
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Sách đã được thêm thành công
 *         content:
 *           application/json:
 *             example:
 *               message: "Sách đã được tạo"
 *               bookId: 3
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       401:
 *         description: Chưa xác thực hoặc token không hợp lệ
 *       500:
 *         description: Lỗi máy chủ khi thêm sách
 */
router.post('/', authenticate, authorize(['admin', 'book_manager']), handleCreateBook);

/**
 * @openapi
 * /books/{id}:
 *   put:
 *     tags:
 *       - Books
 *     summary: Cập nhật sách
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: ID của sách cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Cuộc sống kỳ diệu - Cập nhật"
 *               author:
 *                 type: string
 *                 example: "Lê Minh T"
 *               genre:
 *                 type: string
 *                 example: "Triết lý"
 *               published_year:
 *                 type: integer
 *                 example: 2023
 *               quantity:
 *                 type: integer
 *                 example: 100
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *         content:
 *           application/json:
 *             example:
 *               message: "Sách đã được cập nhật"
 *       404:
 *         description: Không tìm thấy sách
 *       401:
 *         description: Chưa xác thực hoặc token không hợp lệ
 *       500:
 *         description: Lỗi máy chủ khi cập nhật sách
 */
router.put('/:id', authenticate, authorize(['admin', 'book_manager']), handleUpdateBook);

/**
 * @openapi
 * /books/{id}:
 *   delete:
 *     tags:
 *       - Books
 *     summary: Xóa sách
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 2
 *         description: ID của sách cần xóa
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Xóa thành công
 *         content:
 *           application/json:
 *             example:
 *               message: "Sách đã được xóa"
 *       404:
 *         description: Không tìm thấy sách
 *       401:
 *         description: Chưa xác thực hoặc token không hợp lệ
 *       500:
 *         description: Lỗi máy chủ khi xóa sách
 */
router.delete('/:id', authenticate, authorize(['admin', 'book_manager']), handleDeleteBook);

module.exports = router;