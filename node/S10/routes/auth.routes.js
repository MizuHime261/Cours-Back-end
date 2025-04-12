const express = require('express');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { upload } = require('../services/auth.service');

const router = express.Router();
router.get('/token', (req, res) => {
    const envData = fs.readFileSync('.env', 'utf8').split('\n');
    const tokenLine = envData.find(line => line.startsWith('JWT_TOKEN='));
    
    if (tokenLine) {
        const token = tokenLine.split('=')[1];
        return res.json({ token });
    } else {
        return res.status(404).json({ message: 'Token not found' });
    }
});
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/reset-password', authController.resetPassword);
router.post('/users/:id/avatar', upload.single('avatar'), authController.uploadAvatar);

module.exports = router;