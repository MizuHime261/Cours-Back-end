const db = require('../config/db');

// Lấy tất cả sách với phân trang
module.exports.getAllBooks = async (page = 1, orderBy = 'id', orderDirection = 'asc') => {
  const limit = 5;
  const offset = (page - 1) * limit;

  try {
    // Debug: In ra tham số orderBy và orderDirection
    console.log(`Order by: ${orderBy}, Direction: ${orderDirection}`);

    // Kiểm tra nếu có tham số sắp xếp thì áp dụng, mặc định theo 'id'
    const booksQuery = db('books')
      .select('*')
      .limit(limit)
      .offset(offset);

    // Chỉ sắp xếp khi có yêu cầu
    if (orderBy && orderDirection) {
      // Đảm bảo rằng 'orderDirection' luôn là 'asc' hoặc 'desc'
      const validDirections = ['asc', 'desc'];
      if (validDirections.includes(orderDirection.toLowerCase())) {
        booksQuery.orderBy(orderBy, orderDirection);
      } else {
        booksQuery.orderBy(orderBy, 'asc'); // Mặc định sắp xếp tăng dần nếu 'orderDirection' không hợp lệ
      }
    }

    const books = await booksQuery;

    const [{ count }] = await db('books').count('id as count'); // lấy tổng số sách

    return {
      books,
      totalBooks: parseInt(count),
      currentPage: page,
      totalPages: Math.ceil(count / limit)
    };
  } catch (error) {
    throw new Error(`Lỗi cơ sở dữ liệu - getAllBooks: ${error.message}`);
  }
};


// Lấy sách theo ID
module.exports.getBookById = async (id) => {
  try {
    return await db('books').where('id', id).first();
  } catch (error) {
    throw new Error(`Lỗi cơ sở dữ liệu - getBookById: ${error.message}`);
  }
};

// Thêm sách mới
module.exports.createBook = async (book) => {
  try {
    const [id] = await db('books').insert(book);
    return await module.exports.getBookById(id);
  } catch (error) {
    throw new Error(`Lỗi cơ sở dữ liệu - createBook: ${error.message}`);
  }
};

// Cập nhật sách
module.exports.updateBook = async (id, book) => {
  try {
    const updatedCount = await db('books').where('id', id).update(book);
    if (updatedCount > 0) {
      return await module.exports.getBookById(id);
    }
    return null;
  } catch (error) {
    throw new Error(`Lỗi cơ sở dữ liệu - updateBook: ${error.message}`);
  }
};

// Xóa sách
module.exports.deleteBook = async (id) => {
  try {
    const deletedCount = await db('books').where('id', id).del();
    if (deletedCount > 0) {
      return { id };
    }
    return null;
  } catch (error) {
    throw new Error(`Lỗi cơ sở dữ liệu - deleteBook: ${error.message}`);
  }
};

module.exports.searchBooksByTitle = async (title) => {
  try {
    const book = await db('books')
      .where('title', 'like', `%${title}%`)
      .orWhere('author', 'like', `%${title}%`)
      .select('*');
    return book;
  } catch (error) {
    console.error('Lỗi khi tìm kiếm sách theo tiêu đề:', error.message);
    throw new Error('Đã xảy ra lỗi khi tìm kiếm sách. Vui lòng thử lại sau!');
  }
};