const knex = require("../config/database");

module.exports.getCategories = async function (query) {
  let categoriesQuery = knex("Categories").select("*");

  // 🟢 1. Sắp xếp dữ liệu (Sort)
  if (query.sort) {
    const order = query.order === "desc" ? "desc" : "asc";
    categoriesQuery.orderBy(query.sort, order);
  }

  // 🟢 2. Pagination
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const offset = (page - 1) * limit;
  categoriesQuery.limit(limit).offset(offset);

  // 🟢 3. Trả về danh sách categories
  return await categoriesQuery;
};

module.exports.getCategoryById = async function (categoryId) {
	return await knex("Categories").where("categoryId", categoryId).first();
};

module.exports.getBooksByCategory = async function (categoryId, query) {
	let booksQuery = knex("Books")
	  .select("Books.*", "Authors.name as authorName")
	  .leftJoin("Authors", "Books.authorId", "Authors.authorId")
	  .where("Books.categoryId", categoryId);
  
	// 🟢 1. Lọc theo khoảng giá
	if (query.minPrice) booksQuery.where("Books.price", ">=", query.minPrice);
	if (query.maxPrice) booksQuery.where("Books.price", "<=", query.maxPrice);
  
	// 🟢 2. Lọc theo khoảng đánh giá
	if (query.minRate) booksQuery.where("Books.rate", ">=", query.minRate);
	if (query.maxRate) booksQuery.where("Books.rate", "<=", query.maxRate);
  
	// 🟢 3. Lọc theo tên tác giả
	if (query.author_name) booksQuery.where("Authors.name", "like", `%${query.author_name}%`);
  
	// 🟢 4. Pagination
	const page = parseInt(query.page) || 1;
	const limit = parseInt(query.limit) || 10;
	const offset = (page - 1) * limit;
	booksQuery.limit(limit).offset(offset);
  
	// 🟢 5. Sắp xếp
	if (query.sort) {
	  const order = query.order === "desc" ? "desc" : "asc";
	  booksQuery.orderBy(`Books.${query.sort}`, order);
	}
  
	return await booksQuery;
};

module.exports.createCategory = async function (categoryData) {
	const [newCategory] = await knex("Categories")
	  .insert({ categoryName: categoryData.name }) // Chỉ insert name
	  .returning("*");
  
	return newCategory;
};

module.exports.updateCategory = async function (categoryId, categoryName) {
	return await knex("Categories").where("categoryId", categoryId).update({ categoryName });
};

module.exports.deleteCategory = async function (categoryId) {
	return await knex("Categories").where("categoryId", categoryId).del();
};