const db = require('../config/db');

// Lấy tất cả người dùng
module.exports.getAllUsers = async (page = 1) => {
  const limit = 5;
  const offset = (page - 1) * limit;

  try {
    return await db('users')
      .select('id', 'name', 'email', 'role', 'password')
      .limit(limit)
      .offset(offset);
  } catch (error) {
    throw new Error(`Lỗi cơ sở dữ liệu - getAllUsers: ${error.message}`);
  }
};

// Lấy người dùng theo ID
module.exports.getUserById = async (id) => {
  try {
    return await db('users').where('id', id).first();
  } catch (error) {
    throw new Error(`Lỗi cơ sở dữ liệu - getUserById: ${error.message}`);
  }
};

// Lấy người dùng theo Email
module.exports.getUserByEmail = async (email) => {
  try {
    return await db('users').where('email', email).first();
  } catch (error) {
    throw new Error(`Lỗi cơ sở dữ liệu - getUserByEmail: ${error.message}`);
  }
};

// Thêm người dùng
module.exports.createUser = async (user) => {
  try {
    const [id] = await db('users').insert(user);
    return id; // Trả về ID của người dùng vừa tạo
  } catch (error) {
    throw new Error(`Lỗi cơ sở dữ liệu - createUser: ${error.message}`);
  }
};

// Cập nhật người dùng
module.exports.updateUser = async (id, user) => {
  try {
    return await db('users').where('id', id).update(user);
  } catch (error) {
    throw new Error(`Lỗi cơ sở dữ liệu - updateUser: ${error.message}`);
  }
};

// Xóa người dùng
module.exports.deleteUser = async (id) => {
  try {
    return await db('users').where('id', id).del();
  } catch (error) {
    throw new Error(`Lỗi cơ sở dữ liệu - deleteUser: ${error.message}`);
  }
};