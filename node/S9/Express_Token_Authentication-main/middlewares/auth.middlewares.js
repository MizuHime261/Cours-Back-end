const { registerBody } = require("../config/validate-schema");
const jwt = require('jsonwebtoken');
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
      return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  let token = req.headers.authorization.split(" ")[1];
  try {
      let decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      console.log("Decoded Token:", decoded); // Debug token
      req.user = decoded;
      next();
  } catch (error) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports.authorize = function (roles) {
  return function (req, res, next) {
      if (!req.user || !req.user.role) {
          return res.status(403).json({ message: "Forbidden: No role assigned" });
      }

      console.log("User Role:", req.user.role); // Debug role

      if (!roles.includes(req.user.role)) {
          return res.status(403).json({ message: "Forbidden: Not enough permissions" });
      }
      
      next();
  };
};


