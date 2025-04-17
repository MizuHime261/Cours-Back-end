const bcrypt = require('bcryptjs');
const {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser
} = require('../models/user.model');

// Lấy danh sách người dùng
module.exports.handleGetAllUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json({
      message: 'Lấy danh sách người dùng thành công',
      data: users,
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi máy chủ khi lấy danh sách người dùng', error: error.message });
  }
};

// Lấy người dùng theo ID
module.exports.handleGetUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    if (!user) return res.status(404).json({ message: 'Không tìm thấy người dùng' });

    res.status(200).json({
      message: 'Lấy thông tin người dùng thành công',
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi máy chủ khi lấy thông tin người dùng', error: error.message });
  }
};

// Thêm người dùng
module.exports.handleCreateUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin' });
  }

  try {
    const existing = await getUserByEmail(email);
    if (existing) return res.status(409).json({ message: 'Email đã được sử dụng' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { name, email, password: hashedPassword, role };

    const id = await createUser(newUser);
    res.status(201).json({ message: 'Tạo người dùng thành công', userId: id });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi máy chủ khi tạo người dùng', error: error.message });
  }
};

// Cập nhật người dùng
module.exports.handleUpdateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role } = req.body;

  try {
    const user = await getUserById(id);
    if (!user) return res.status(404).json({ message: 'Không tìm thấy người dùng' });

    const updatedUser = {
      name: name || user.name,
      email: email || user.email,
      role: role || user.role,
    };

    if (password) {
      updatedUser.password = await bcrypt.hash(password, 10);
    }

    await updateUser(id, updatedUser);
    res.status(200).json({ message: 'Cập nhật người dùng thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi máy chủ khi cập nhật người dùng', error: error.message });
  }
};

// Xóa người dùng
module.exports.handleDeleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await getUserById(id);
    if (!user) return res.status(404).json({ message: 'Không tìm thấy người dùng' });

    await deleteUser(id);
    res.status(200).json({ message: 'Xóa người dùng thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi máy chủ khi xóa người dùng', error: error.message });
  }
};