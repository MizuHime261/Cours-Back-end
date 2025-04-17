const bookModel = require('../models/book.model');

// Lấy tất cả sách (có phân trang)
module.exports.handleGetAllBooks = async (req, res) => {
  const page = parseInt(req.query.page) || 1;  // Lấy số trang từ query, mặc định là 1
  const orderBy = req.query.orderBy || 'id';  // Lấy trường sắp xếp từ query, mặc định là 'id'
  const orderDirection = req.query.orderDirection || 'asc';  // Lấy hướng sắp xếp từ query, mặc định là 'asc'

  try {
    const result = await bookModel.getAllBooks(page, orderBy, orderDirection);

    res.status(200).json({
      success: true,
      data: result.books,
      pagination: {
        currentPage: result.currentPage,
        totalPages: result.totalPages,
        totalBooks: result.totalBooks
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Có lỗi khi lấy danh sách sách' });
  }
};

// Lấy sách theo ID
module.exports.handleGetBookById = async (req, res) => {
  try {
    const book = await bookModel.getBookById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Không tìm thấy sách' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Thêm sách mới
module.exports.handleCreateBook = async (req, res) => {
  try {
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      published_year: req.body.published_year,
      quantity: req.body.quantity
    };
    const createdBook = await bookModel.createBook(newBook);
    res.status(201).json({ message: 'Sách đã được tạo', bookId: createdBook.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật sách
module.exports.handleUpdateBook = async (req, res) => {
  try {
    const bookUpdate = {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      published_year: req.body.published_year,
      quantity: req.body.quantity
    };
    const updatedBook = await bookModel.updateBook(req.params.id, bookUpdate);
    if (!updatedBook) {
      return res.status(404).json({ message: 'Không tìm thấy sách để cập nhật' });
    }
    res.status(200).json({ message: 'Sách đã được cập nhật' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xóa sách
module.exports.handleDeleteBook = async (req, res) => {
  try {
    const result = await bookModel.deleteBook(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Không tìm thấy sách để xóa' });
    }
    res.status(200).json({ message: 'Sách đã được xóa' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.searchBooks = async (req, res) => {
  const { title } = req.query;
  if (!title) {
    return res.status(400).json({ message: 'Title query parameter is required' });
  }

  try {
    const books = await bookModel.searchBooksByTitle(title);
    if (books.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy sách hoặc tác giải phù hợp' });
    }
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ 'Lỗi máy chủ khi lấy danh sách sách': error.message });
  }
};