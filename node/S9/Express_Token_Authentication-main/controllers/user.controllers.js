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
  console.log(req.body);
  console.log(req.file);
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No files uploaded" });
  }
  res.json({
    message: "UPLOAD MULTIPLE FILES SUCCESSFULLY",
    files: req.files.map(file => ({
      filename: file.filename,
      path: file.path
    }))
  });
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
