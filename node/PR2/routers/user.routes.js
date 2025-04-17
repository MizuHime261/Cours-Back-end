const express = require('express');
const router = express.Router();
const {
  handleGetAllUsers,
  handleGetUserById,
  handleCreateUser,
  handleUpdateUser,
  handleDeleteUser,
} = require('../controllers/user.controller');

const { authenticate, authorize } = require('../middlewares/auth.middleware');

/**
 * @openapi
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Lấy danh sách người dùng (có phân trang)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Số trang muốn lấy (mỗi trang 5 người dùng)
 *     responses:
 *       200:
 *         description: Lấy danh sách người dùng thành công
 *         content:
 *           application/json:
 *             example:
 *               users:
 *                 - id: 1
 *                   name: Nguyễn Văn A
 *                   email: a@gmail.com
 *                   role: admin
 *                 - id: 2
 *                   name: Trần Thị B
 *                   email: b@gmail.com
 *                   role: teacher
 *               currentPage: 1
 *               totalUsers: 12
 *               totalPages: 3
 *       401:
 *         description: Chưa xác thực hoặc token không hợp lệ
 *       500:
 *         description: Lỗi máy chủ khi lấy danh sách người dùng
 */
router.get('/', authenticate, authorize(["admin"]), handleGetAllUsers);

/**
 * @openapi
 * /users:
 *   post:
 *     tags:
 *       - Users
 *     summary: Thêm người dùng mới
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: trangggtranggg
 *               email:
 *                 type: string
 *                 example: trangggtranggg@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *               role:
 *                 type: string
 *                 example: book_manager
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Thêm người dùng thành công
 *         content:
 *           application/json:
 *             example:
 *               message: "Người dùng đã được tạo"
 *               userId: 3
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       409:
 *         description: Email đã được sử dụng
 *       401:
 *         description: Chưa xác thực hoặc token không hợp lệ
 *       500:
 *         description: Lỗi máy chủ khi thêm người dùng
 */
router.post('/', authenticate, authorize(["admin"]), handleCreateUser);

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Lấy thông tin người dùng theo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của người dùng cần lấy thông tin
 *         schema:
 *           type: integer
 *           example: 1
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy thông tin người dùng thành công
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               name: Nguyễn Văn A
 *               email: a@gmail.com
 *               role: admin
 *       404:
 *         description: Không tìm thấy người dùng
 *       401:
 *         description: Chưa xác thực hoặc token không hợp lệ
 *       500:
 *         description: Lỗi máy chủ khi lấy thông tin người dùng
 */
router.get('/:id', authenticate, authorize(["admin", "book_manager"]), handleGetUserById);

/**
 * @openapi
 * /users/{id}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Cập nhật người dùng
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: ID của người dùng
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Nguyễn Văn A Updated
 *               email:
 *                 type: string
 *                 example: updated_a@gmail.com
 *               password:
 *                 type: string
 *                 example: newpassword123
 *               role:
 *                 type: string
 *                 example: book_manager
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *         content:
 *           application/json:
 *             example:
 *               message: "Người dùng đã được cập nhật"
 *       404:
 *         description: Không tìm thấy người dùng
 *       401:
 *         description: Chưa xác thực hoặc token không hợp lệ
 *       500:
 *         description: Lỗi máy chủ khi cập nhật
 */
router.put('/:id', authenticate, authorize(["admin"]), handleUpdateUser);

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Xóa người dùng
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 2
 *         description: ID của người dùng cần xóa
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Xóa thành công
 *         content:
 *           application/json:
 *             example:
 *               message: "Người dùng đã được xóa"
 *       404:
 *         description: Không tìm thấy người dùng
 *       401:
 *         description: Chưa xác thực hoặc token không hợp lệ
 *       500:
 *         description: Lỗi máy chủ khi xóa
 */
router.delete('/:id', authenticate, authorize(["admin"]), handleDeleteUser);

module.exports = router;