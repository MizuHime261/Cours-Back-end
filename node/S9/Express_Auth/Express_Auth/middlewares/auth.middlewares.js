const { registerBody } = require("../config/validate-schema");
const jwt = require("jsonwebtoken");

module.exports.validateBody = function (req, res, next) {
  // email, pass
  let { email, password } = req.body;
  // Kiểm tra tính hợp lệ của email (@.gmail .hotmail....)
  // Kiểm tra tính hợp lệ của password (8 ký tự, chứa cả hoa thường, cả số...);

  let { error } = registerBody.validate({ email, password });
  if (error) {
    res.json(err);
  } else {
    next();
  }
};

module.exports.authenticate = function (req, res, next) {
  if (!req.headers.authorization) {
    res.json({
      message: "Unauthorized !!!",
    });
  } else {
    let token = req.headers.authorization.split(" ")[1];
    try {
      let decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      // Đây là một người dùng đã đăng nhập !!!!
      req.user = decoded;
      next();
    } catch (error) {
      res.json(error);
    }
  }
};

module.exports.authorize = function (roles) {
  return function (req, res, next) {
    console.log(req.user);
    console.log(roles);
    if (roles.includes(req.user.role)) {
      next();
    } else {
      res.json({
        message: "Forbidden",
      });
    }
  };
};
