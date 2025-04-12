const db = require("../config/db");
module.exports.getAll = async () => {};
module.exports.getOne = async () => {};
module.exports.creatOne = async (email, password) => {
  return await db("user").insert({
    email: email,
    password: password,
  });
};
module.exports.updateOne = () => {};
module.exports.deleteOne = () => {};
