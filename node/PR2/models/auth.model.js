const db = require('../config/db.js');
const bcrypt = require('bcryptjs');
const userModel = require('./user.model');
const jwt = require('jsonwebtoken');

module.exports.register = async (email, password, name) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  // Tạo đối tượng người dùng với email và password đã mã hóa
  const user = {
	  name: name,
    email: email,
    password: hash,
    role: "user"
  };

  try {
    const userId = await userModel.createUser(user); // Truyền đối tượng người dùng vào
    return userId; // Trả về ID của người dùng vừa tạo
  } catch (error) {
    throw new Error(`Lỗi đăng ký người dùng: ${error.message}`);
  }
};

module.exports.login = async (email, password) => {
  const result = await db('users').select('*').where('email', email);

  if (result.length === 0) {
    throw new Error('Tài khoản không tồn tại');
  }

  const [user] = result;
  const comparedResult = await bcrypt.compare(password, user.password);

  if (comparedResult) {
    const token = jwt.sign(
      { ID: user.id, role: user.role },
      process.env.TOKEN_SECRET,
      { expiresIn: '1h' }
    );
    return token;
  } else {
    console.log("Mật khẩu không khớp cho email:", email);
    throw new Error('Sai mật khẩu');
  }
};