const userService = require("../services/user.services");

module.exports.getAll = (req, res) => {
  res.json({
    message: "GET ALL SUCCESSFULLY",
  });
};
module.exports.getOne = (req, res) => {
  res.json({
    message: "GET ONE SUCCESSFULLY",
  });
};
module.exports.createOne = (req, res) => {
  res.json({
    message: "POST ONE SUCCESSFULLY",
  });
};
module.exports.updateOne = (req, res) => {
  res.json({
    message: "UPDATE ONE SUCCESSFULLY",
  });
};
module.exports.deleteOne = (req, res) => {
  res.json({
    message: "DELETE ONE SUCCESSFULLY",
  });
};
