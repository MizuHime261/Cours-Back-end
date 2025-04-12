const db = require("../config/db");
const bcrypt = require("bcryptjs");
const userService = require("./user.services");
const jwt = require("jsonwebtoken");
module.exports.register = async function (email, password) {
  // Sử dụng thông tin email và password để tạo ra 1 đối tượng user
  // Mã hoá mật khẩu của user
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  return await userService.creatOne(email, hash);
};

module.exports.signIn = async function (email, password) {
  let result = await db("user").select("*").where("email", email);
  if (result.length === 0) {
      return { message: `User with email: ${email} not existed` };
  }

  let [user] = result;
  let comparedResult = await bcrypt.compare(password, user.password);
  if (comparedResult) {
      let token = jwt.sign(
          { user_id: user.id, role: user.role },  // Thêm role vào token
          process.env.TOKEN_SECRET,
          { expiresIn: "1h" } // Hết hạn sau 1 giờ
      );
      return token;
  } else {
      return { message: `Password is incorrect` };
  }
};
