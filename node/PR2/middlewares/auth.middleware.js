const { registerBody } = require("../config/validate-schema");
const jwt = require('jsonwebtoken');

// Validate dữ liệu đầu vào cho đăng ký người dùng
module.exports.validateBody = function (req, res, next) {
  const { error } = registerBody.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

// Middleware để xác thực người dùng
module.exports.authenticate = function (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  } else {
    let token = req.headers.authorization.split(" ")[1];

    try {
      let decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  }
};

// Middleware để kiểm tra quyền truy cập của người dùng
module.exports.authorize = function (role) {
  return function (req, res, next) {
    console.log("Vai trò được cho phép:", role);
    console.log("Vai trò người dùng hiện tại:", req.user?.role);

    if (role.includes(req.user.role)) {
      next();
    } else {
      return res.status(403).json({ message: "Không có quyền truy cập" });
    }
  }
};
