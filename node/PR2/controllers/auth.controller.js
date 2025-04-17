const authModel = require('../models/auth.model');


module.exports.register = async (req, res) => {
  const { email, password, name } = req.body;

  // Kiểm tra xem email, password, name có tồn tại không
  if (!email || !password || !name) {
    return res.status(400).json({ message: 'Email, password và name là bắt buộc' });
  }

  try {
    const userId = await authModel.register(email, password, name);
    return res.status(201).json({ message: 'Đăng ký thành công', userId });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.login = async (req, res) => {
  let { email, password } = req.body;
  try {
    let result = await authModel.login(email, password);
    res.json({
      accessToken: result,
      message: 'Đăng nhập thành công',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}