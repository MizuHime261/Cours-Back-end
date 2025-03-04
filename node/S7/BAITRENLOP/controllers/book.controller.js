const bookService = require("../services/book.service");

module.exports.getBooks = async function (req, res) {
  try {
    const books = await bookService.getBooks(req.query);
    res.json({ success: true, data: books });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi server", error });
  }
};

// 📌 Lấy sách theo ID
module.exports.getBookById = async function (req, res) {
	try {
	  const bookId = req.params.id;
	  const book = await bookService.getBookById(bookId);
  
	  if (!book) {
		return res.status(404).json({ success: false, message: "Không tìm thấy sách" });
	  }
  
	  res.json({ success: true, data: book });
	} catch (error) {
	  res.status(500).json({ success: false, message: "Lỗi server", error });
	}
};

module.exports.getBookReviews = async function (req, res) {
	try {
	  const bookId = req.params.id;
	  const reviews = await bookService.getBookReviews(bookId);
  
	  if (!reviews.length) {
		return res.status(404).json({ success: false, message: "Không có review nào cho sách này" });
	  }
  
	  res.json({ success: true, data: reviews });
	} catch (error) {
	  res.status(500).json({ success: false, message: "Lỗi server", error });
	}
};
  
module.exports.createBook = async function (req, res) {
	try {
	  const { title, authorId, categoryId, price, rate } = req.body;
  
	  // Kiểm tra xem sách đã tồn tại chưa
	  const existingBook = await bookService.findBookByTitle(title);
	  if (existingBook) {
		return res.status(400).json({ success: false, message: "Book already exists", data: existingBook });
	  }
  
	  // Thêm sách mới
	  const [newBookId] = await bookService.createBook({ title, authorId, categoryId, price, rate });
  
	  // Lấy thông tin sách vừa thêm
	  const newBook = await bookService.getBookById(newBookId);
  
	  res.status(201).json({ success: true, message: "Create successfully", data: newBook });
	} catch (error) {
	  res.status(500).json({ success: false, message: "Lỗi server", error });
	}
}; 

module.exports.addReview = async function (req, res) {
	try {
	  const bookId = req.params.id;
	  const { content } = req.body;
  
	  // Kiểm tra sách có tồn tại không
	  const book = await bookService.getBookById(bookId);
	  if (!book) {
		return res.status(404).json({ success: false, message: "Không tìm thấy sách" });
	  }
  
	  // Thêm review vào database
	  const [reviewId] = await bookService.addReview(bookId, content);
  
	  // Lấy thông tin review vừa thêm
	  const newReview = await bookService.getReviewById(reviewId);
  
	  res.status(201).json({ success: true, message: "Thêm review thành công", data: newReview });
	} catch (error) {
	  res.status(500).json({ success: false, message: "Lỗi server", error });
	}
};
  
module.exports.updateBook = async function (req, res) {
	try {
	  const bookId = req.params.id;
	  const { title, authorId, categoryId, price, rate } = req.body;
  
	  // Kiểm tra sách có tồn tại không
	  const book = await bookService.getBookById(bookId);
	  if (!book) {
		return res.status(404).json({ success: false, message: "Book not found" });
	  }
  
	  // Cập nhật sách
	  await bookService.updateBook(bookId, { title, authorId, categoryId, price, rate });
  
	  // Lấy thông tin sách sau khi cập nhật
	  const updatedBook = await bookService.getBookById(bookId);
  
	  res.json({ success: true, message: "Update successfully", data: updatedBook });
	} catch (error) {
	  res.status(500).json({ success: false, message: "Server error", error });
	}
};

module.exports.deleteBook = async function (req, res) {
	try {
	  const bookId = req.params.id;
  
	  // Kiểm tra sách có tồn tại không
	  const book = await bookService.getBookById(bookId);
	  if (!book) {
		return res.status(404).json({ success: false, message: "Book not found" });
	  }
  
	  // Xóa sách
	  await bookService.deleteBook(bookId);
  
	  res.json({ success: true, message: "Delete successfully" });
	} catch (error) {
	  res.status(500).json({ success: false, message: "Server error", error });
	}
};  