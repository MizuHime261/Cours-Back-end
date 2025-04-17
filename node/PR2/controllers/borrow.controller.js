const borrowModel = require('../models/borrow.model');

// Lấy tất cả các bản ghi mượn sách
module.exports.getAllBorrows = async (req, res) => {
  try {
    const borrows = await borrowModel.getAllBorrows();
    res.status(200).json(borrows);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi máy chủ khi lấy danh sách mượn sách' });
  }
};

// Lấy các bản ghi mượn sách theo người dùng
module.exports.getBorrowsByUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const borrows = await borrowModel.getBorrowsByUser(userId);
    res.status(200).json(borrows);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi máy chủ khi lấy danh sách mượn sách của người dùng' });
  }
};

// Lấy các sách chưa trả
module.exports.getOverdueBorrows = async (req, res) => {
  try {
    const borrows = await borrowModel.getOverdueBorrows();
    res.status(200).json(borrows);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi máy chủ khi lấy danh sách sách chưa trả' });
  }
};

// Mượn sách
module.exports.borrowBook = async (req, res) => {
  const { user_id, book_id } = req.body;
  try {
    const newBorrow = await borrowModel.borrowBook(user_id, book_id);
    res.status(201).json({
		id: newBorrow.id,
		user_id: newBorrow.user_id,
		book_id: newBorrow.book_id,
		borrow_date: newBorrow.borrow_date.toISOString(), // ensure the date format is in ISO 8601 format
		status: newBorrow.status
  });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi máy chủ khi mượn sách' });
  }
};

// Trả sách
module.exports.returnBook = async (req, res) => {
  const borrowId = req.params.id;
  try {
    await borrowModel.returnBook(borrowId);
    res.status(200).json({ message: 'Trả sách thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi máy chủ khi trả sách' });
  }
};

// Kiểm tra tình trạng sách
module.exports.getBookStatus = async (req, res) => {
  const bookId = req.params.bookId;
  try {
    const borrowRecord = await borrowModel.getBookStatus(bookId);
    res.status(200).json(borrowRecord);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi máy chủ khi kiểm tra tình trạng sách' });
  }
};

// Lấy thông tin sách mượn theo ID sách
module.exports.getBorrowsByBook = async (req, res) => {
  const bookId = req.params.bookId;
  try {
    const borrows = await borrowModel.getBorrowsByBook(bookId);
    res.status(200).json(borrows);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi máy chủ khi lấy thông tin mượn sách theo ID sách' });
  }
};