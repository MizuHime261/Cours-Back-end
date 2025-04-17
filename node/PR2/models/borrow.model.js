const knex = require('../config/db');

// Lấy tất cả các bản ghi mượn sách
const getAllBorrows = async () => {
  const borrows = await knex('borrow')
    .join('users', 'borrow.user_id', '=', 'users.id')
    .join('books', 'borrow.book_id', '=', 'books.id')
    .select('borrow.*', 'users.name as user_name', 'books.title as book_title', 'books.genre', 'books.quantity');

  // Tính số sách đã mượn và chưa mượn cho mỗi loại sách
  const result = borrows.map(borrow => {
    const totalBorrowed = borrows.filter(b => b.genre === borrow.genre && b.status === 'borrowed').length;
    const totalAvailable = borrow.quantity - totalBorrowed;

    return {
      ...borrow,
      totalBorrowed,
      totalAvailable,
      message: totalAvailable === 0 ? 'Sách đã mượn hết' : `${totalAvailable} sách còn lại`
    };
  });

  return result;
};

// Lấy các bản ghi mượn sách theo người dùng
const getBorrowsByUser = async (userId) => {
  return await knex('borrow')
    .join('users', 'borrow.user_id', '=', 'users.id')
    .join('books', 'borrow.book_id', '=', 'books.id')
    .select('borrow.*', 'users.name as user_name', 'books.title as book_title')
    .where('borrow.user_id', userId);
};

// Lấy các sách chưa trả
const getOverdueBorrows = async () => {
  return await knex('borrow')
    .join('users', 'borrow.user_id', '=', 'users.id')
    .join('books', 'borrow.book_id', '=', 'books.id')
    .select('borrow.*', 'users.name as user_name', 'books.title as book_title')
    .whereNull('borrow.return_date')
    .andWhere('borrow.status', 'borrowed');
};

// Mượn sách
const borrowBook = async (user_id, book_id) => {
  // Kiểm tra số sách có còn lại không
  const book = await knex('books').where('id', book_id).first();
  const borrowedCount = await knex('borrow')
    .where('book_id', book_id)
    .andWhere('status', 'borrowed')
    .count();

  const availableBooks = book.quantity - borrowedCount[0]['count(*)'];

  if (availableBooks <= 0) {
    throw new Error('Sách đã mượn hết');
  }

  // Mượn sách nếu còn sách
  const borrowRecord = await knex('borrow').insert({
    user_id,
    book_id,
    borrow_date: knex.fn.now(),
    status: 'borrowed'
  }).returning('*');

  // Cập nhật số lượng sách còn lại trong kho
  await knex('books')
    .where('id', book_id)
    .decrement('quantity', 1);

  return borrowRecord;
};

// Trả sách
const returnBook = async (borrowId) => {
  // Lấy thông tin sách trong bản ghi mượn
  const borrowRecord = await knex('borrow')
    .where('id', borrowId)
    .first();
  const bookId = borrowRecord.book_id;

  // Cập nhật trạng thái sách trả lại
  await knex('borrow')
    .where('id', borrowId)
    .update({
      return_date: knex.fn.now(),
      status: 'returned'
    });

  // Cập nhật số lượng sách còn lại trong kho
  await knex('books')
    .where('id', bookId)
    .increment('quantity', 1);
};

// Kiểm tra trạng thái của sách
const getBookStatus = async (bookId) => {
  const book = await knex('books').where('id', bookId).first();
  const borrowedCount = await knex('borrow')
    .where('book_id', bookId)
    .andWhere('status', 'borrowed')
    .count();

  const availableBooks = book.quantity - borrowedCount[0]['count(*)'];

  return {
    book,
    availableBooks,
    message: availableBooks <= 0 ? 'Sách đã mượn hết' : `${availableBooks} sách còn lại`
  };
};

// Lấy tất cả các bản ghi mượn sách theo ID sách
const getBorrowsByBook = async (bookId) => {
  return await knex('borrow')
    .join('users', 'borrow.user_id', '=', 'users.id')
    .select('borrow.*', 'users.name as user_name')
    .where('borrow.book_id', bookId);
};

module.exports = {
  getAllBorrows,
  getBorrowsByUser,
  getOverdueBorrows,
  borrowBook,
  returnBook,
  getBookStatus,
  getBorrowsByBook
};