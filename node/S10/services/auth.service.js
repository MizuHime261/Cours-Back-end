const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');
const multer = require('multer');

// Hàm ghi token vào file .env
const saveTokenToEnv = (token) => {
    let envConfig = fs.readFileSync('.env', 'utf8').split('\n');

    let updated = false;
    envConfig = envConfig.map(line => {
        if (line.startsWith('JWT_TOKEN=')) {
            updated = true;
            return `JWT_TOKEN=${token}`;
        }
        return line;
    });

    if (!updated) {
        envConfig.push(`JWT_TOKEN=${token}`);
    }

    fs.writeFileSync('.env', envConfig.join('\n'), 'utf8');
};

// Đăng ký tài khoản
exports.register = async ({ name, email, password }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [userId] = await db('users').insert({ name, email, password: hashedPassword });

    // Tạo token với thời gian sống 1 phút
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1m' });

    // Lưu token vào file .env
    saveTokenToEnv(token);

    return { userId, token };
};

// Đăng nhập
exports.login = async ({ email, password }) => {
    const user = await db('users').where({ email }).first();
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid credentials');
    }

    // Tạo token với thời gian sống 1 phút
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1m' });

    // Lưu token vào file .env
    saveTokenToEnv(token);

    return token;
};

// Đặt lại mật khẩu (Chưa triển khai)
exports.resetPassword = async (email) => {
    // TODO: Implement email sending logic
    return true;
};

// Tải lên avatar
exports.uploadAvatar = async (userId, file) => {
    const avatarPath = `/uploads/${file.filename}`;
    await db('users').where({ id: userId }).update({ avatar: avatarPath });
    return avatarPath;
};

// Cấu hình lưu file tải lên
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
exports.upload = multer({ storage });