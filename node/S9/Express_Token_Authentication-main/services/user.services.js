const db = require("../config/db");
module.exports.getAll = async () => {};
module.exports.getOne = async () => {};
module.exports.getOne = async (id) => {
  return await db("user").where({ id }).first();
};

module.exports.createOne = async ({ email, password, avatarUrl = null }) => {
  const [newUserId] = await db("user").insert({
    email,
    password,
    avatarUrl,
  });

  return await db("user").where({ id: newUserId }).first();
};
module.exports.updateOne = () => {};
module.exports.deleteOne = () => {};
