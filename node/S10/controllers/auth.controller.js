const { registerSchema, loginSchema } = require("../config/validate-schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserService = require("../services/user.service");

exports.register = async (req, res) => {
    try {
        const { error } = registerSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await UserService.createUser({ ...req.body, password: hashedPassword });

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.status(201).json({ message: "Đăng ký thành công", token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { error } = loginSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const user = await UserService.findUserByEmail(req.body.email);
        if (!user) return res.status(400).json({ message: "Email hoặc mật khẩu không đúng" });

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Email hoặc mật khẩu không đúng" });

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.status(200).json({ message: "Đăng nhập thành công", token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.logout = (req, res) => {
    res.status(200).json({ message: 'Logged out successfully' });
};

exports.resetPassword = async (req, res) => {
    try {
        await authService.resetPassword(req.body.email);
        res.status(200).json({ message: 'Password reset link sent' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.uploadAvatar = async (req, res) => {
    try {
        const avatarUrl = await authService.uploadAvatar(req.params.id, req.file);
        res.status(200).json({ avatarUrl });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};