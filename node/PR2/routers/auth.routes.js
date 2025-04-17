const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { validateBody } = require('../middlewares/auth.middleware');

/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Đăng ký người dùng mới
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
 *             properties:
 *               name:
 *                 type: string
 *                 example: trangvux
 *               email:
 *                 type: string
 *                 example: trangvux@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Đăng ký thành công
 *                 userId:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Dữ liệu không hợp lệ hoặc email đã tồn tại
 *       500:
 *         description: Lỗi máy chủ
 */
router.post('/register', validateBody, authController.register);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Đăng nhập người dùng nhận token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: trangne@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Đăng nhập thành công và trả về token JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: jwt-token
 *       400:
 *         description: Email hoặc mật khẩu không hợp lệ
 *       500:
 *         description: Lỗi máy chủ khi đăng nhập
 */
router.post('/login', authController.login);

module.exports = router;