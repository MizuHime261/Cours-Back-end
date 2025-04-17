const express = require('express');
const router = express.Router();
const borrowController = require('../controllers/borrow.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

/**
 * @openapi
 * /borrows:
 *   get:
 *     tags:
 *       - Borrow
 *     summary: Lấy tất cả các bản ghi mượn sách
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách tất cả các bản ghi mượn sách
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 user_name: "Nguyễn Văn A"
 *                 book_title: "Câu chuyện cổ tích"
 *                 borrow_date: "2025-04-17T10:00:00Z"
 *                 return_date: null
 *                 status: "borrowed"
 *       401:
 *         description: Chưa xác thực hoặc token không hợp lệ
 *       500:
 *         description: Lỗi máy chủ khi lấy danh sách mượn sách
 */
router.get('/', authenticate, authorize(['admin', 'book_manager']), borrowController.getAllBorrows);

/**
 * @openapi
 * /borrows/user/{userId}:
 *   get:
 *     tags:
 *       - Borrow
 *     summary: Lấy các bản ghi mượn sách theo người dùng
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID của người dùng để lấy danh sách mượn sách
 *         schema:
 *           type: integer
 *           example: 1
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách các bản ghi mượn sách của người dùng
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 book_title: "Câu chuyện cổ tích"
 *                 borrow_date: "2025-04-17T10:00:00Z"
 *                 return_date: null
 *                 status: "borrowed"
 *       404:
 *         description: Không tìm thấy bản ghi mượn cho người dùng
 *       401:
 *         description: Chưa xác thực hoặc token không hợp lệ
 *       500:
 *         description: Lỗi máy chủ khi lấy danh sách mượn sách của người dùng
 */
router.get('/user/:userId', authenticate, authorize(['admin', 'book_manager']), borrowController.getBorrowsByUser);

/**
 * @openapi
 * /borrows/overdue:
 *   get:
 *     tags:
 *       - Borrow
 *     summary: Lấy các sách chưa trả
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách các sách chưa trả
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 user_name: "Nguyễn Văn A"
 *                 book_title: "Câu chuyện cổ tích"
 *                 borrow_date: "2025-04-17T10:00:00Z"
 *                 status: "borrowed"
 *       401:
 *         description: Chưa xác thực hoặc token không hợp lệ
 *       500:
 *         description: Lỗi máy chủ khi lấy danh sách sách chưa trả
 */
router.get('/overdue', authenticate, authorize(['admin', 'book_manager']), borrowController.getOverdueBorrows);

/**
 * @openapi
 * /borrows:
 *   post:
 *     tags:
 *       - Borrow
 *     summary: Mượn sách
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 1
 *               book_id:
 *                 type: integer
 *                 example: 1
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Sách mượn thành công
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               user_id: 1
 *               book_id: 1
 *               borrow_date: "2025-04-17T10:00:00Z"
 *               status: "borrowed"
 *       400:
 *         description: Lỗi khi mượn sách, sách đã hết
 *       401:
 *         description: Chưa xác thực hoặc token không hợp lệ
 *       500:
 *         description: Lỗi máy chủ khi mượn sách
 */
router.post('', authenticate, authorize(['admin', 'book_manager']), borrowController.borrowBook);

/**
 * @openapi
 * /borrows/{id}/return:
 *   put:
 *     tags:
 *       - Borrow
 *     summary: Trả sách
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của bản ghi mượn sách cần trả
 *         schema:
 *           type: integer
 *           example: 1
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Trả sách thành công
 *         content:
 *           application/json:
 *             example:
 *               message: "Book returned successfully"
 *       404:
 *         description: Không tìm thấy bản ghi mượn sách
 *       401:
 *         description: Chưa xác thực hoặc token không hợp lệ
 *       500:
 *         description: Lỗi máy chủ khi trả sách
 */
router.put('/:id/return', authenticate, authorize(['admin', 'book_manager']), borrowController.returnBook);

/**
 * @openapi
 * /borrows/book/{bookId}:
 *   get:
 *     tags:
 *       - Borrow
 *     summary: Kiểm tra tình trạng sách
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         description: ID của sách cần kiểm tra tình trạng
 *         schema:
 *           type: integer
 *           example: 1
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tình trạng sách
 *         content:
 *           application/json:
 *             example:
 *               book: 
 *                 id: 1
 *                 title: "Câu chuyện cổ tích"
 *                 quantity: 10
 *               availableBooks: 5
 *               message: "5 sách còn lại"
 *       404:
 *         description: Không tìm thấy sách
 *       401:
 *         description: Chưa xác thực hoặc token không hợp lệ
 *       500:
 *         description: Lỗi máy chủ khi kiểm tra tình trạng sách
 */
router.get('/book/:bookId',authenticate, authorize(['admin', 'book_manager', 'user']), borrowController.getBookStatus);

/**
 * @openapi
 * /borrow/{bookId}:
 *   get:
 *     tags:
 *       - Borrow
 *     summary: Lấy thông tin sách mượn theo ID sách
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         description: ID của sách cần lấy thông tin mượn
 *         schema:
 *           type: integer
 *           example: 1
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách các bản ghi mượn sách theo ID sách
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 user_name: "Nguyễn Văn A"
 *                 borrow_date: "2025-04-17T10:00:00Z"
 *                 return_date: null
 *                 status: "borrowed"
 *       404:
 *         description: Không tìm thấy bản ghi mượn cho sách
 *       401:
 *         description: Chưa xác thực hoặc token không hợp lệ
 *       500:
 *         description: Lỗi máy chủ khi lấy thông tin mượn sách theo ID sách
 */
router.get('/:bookId', authenticate, authorize(['admin', 'book_manager']), borrowController.getBorrowsByBook);

module.exports = router;