const knex = require("../config/database");
module.exports.getBooks = async function (query) {
  let booksQuery = knex("Books")
    .select("Books.*", "Categories.categoryName", "Authors.name as authorName")
    .leftJoin("Categories", "Books.categoryId", "Categories.categoryId")
    .leftJoin("Authors", "Books.authorId", "Authors.authorId");

  // 🟢 1. Filter theo price
  if (query.minPrice) booksQuery.where("Books.price", ">=", query.minPrice);
  if (query.maxPrice) booksQuery.where("Books.price", "<=", query.maxPrice);

  // 🟢 2. Filter theo rate
  if (query.minRate) booksQuery.where("Books.rate", ">=", query.minRate);
  if (query.maxRate) booksQuery.where("Books.rate", "<=", query.maxRate);

  // 🟢 3. Filter theo tên tác giả
  if (query.author_name) booksQuery.where("Authors.name", "like", `%${query.author_name}%`);

  // 🟢 4. Pagination
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const offset = (page - 1) * limit;
  booksQuery.limit(limit).offset(offset);

  // 🟢 5. Sort
  if (query.sort) {
    const order = query.order === "desc" ? "desc" : "asc";
    booksQuery.orderBy(`Books.${query.sort}`, order);
  }

  // 🟢 6. Lấy reviews
  const books = await booksQuery;
  for (let book of books) {
    const reviews = await knex("Reviews").select("content").where("bookId", book.bookId);
    book.reviews = reviews;
  }

  return books;
};

// 📌 Lấy thông tin sách theo ID
module.exports.getBookById = async function (bookId) {
	const book = await knex("Books")
	  .select(
		"Books.*",
		"Authors.name as authorName",
		"Categories.categoryName",
		knex.raw("JSON_ARRAYAGG(JSON_OBJECT('reviewId', Reviews.reviewId, 'content', Reviews.content)) AS reviews")
	  )
	  .leftJoin("Authors", "Books.authorId", "Authors.authorId")
	  .leftJoin("Categories", "Books.categoryId", "Categories.categoryId")
	  .leftJoin("Reviews", "Books.bookId", "Reviews.bookId")
	  .where("Books.bookId", bookId)
	  .groupBy("Books.bookId")
	  .first(); // Lấy 1 bản ghi duy nhất
  
	return book;
};

module.exports.getBookReviews = async function (bookId) {
	return await knex("Reviews")
	  .select("reviewId", "content")
	  .where("bookId", bookId);
};

module.exports.findBookByTitle = async function (title) {
	return await knex("Books").where("title", title).first();
};
  
module.exports.createBook = async function (bookData) {
	return await knex("Books").insert(bookData);
};
  
module.exports.addReview = async function (bookId, content) {
	return await knex("Reviews").insert({ bookId, content });
};
  
module.exports.getReviewById = async function (reviewId) {
	return await knex("Reviews").select("reviewId", "bookId", "content").where("reviewId", reviewId).first();
};
  
module.exports.updateBook = async function (bookId, updatedData) {
	return await knex("Books").where("bookId", bookId).update(updatedData);
};

module.exports.deleteBook = async function (bookId) {
	return await knex("Books").where("bookId", bookId).del();
};