module.exports.validateBook = (req, res, next) => {
	const { minPrice, maxPrice, minRate, maxRate, page, limit, sort, order } = req.query;
  
	if (minPrice && isNaN(minPrice)) return res.status(400).json({ success: false, message: "minPrice phải là số" });
	if (maxPrice && isNaN(maxPrice)) return res.status(400).json({ success: false, message: "maxPrice phải là số" });
	if (minRate && isNaN(minRate)) return res.status(400).json({ success: false, message: "minRate phải là số" });
	if (maxRate && isNaN(maxRate)) return res.status(400).json({ success: false, message: "maxRate phải là số" });
	if (page && (isNaN(page) || page < 1)) return res.status(400).json({ success: false, message: "page phải >= 1" });
	if (limit && (isNaN(limit) || limit < 1)) return res.status(400).json({ success: false, message: "limit phải >= 1" });
	if (sort && !["price", "rate", "title"].includes(sort)) return res.status(400).json({ success: false, message: "sort không hợp lệ" });
	if (order && !["asc", "desc"].includes(order)) return res.status(400).json({ success: false, message: "order phải là asc hoặc desc" });
  
	next();
};

module.exports.validateBookId = (req, res, next) => {
	const { id } = req.params;
  
	if (!id || isNaN(id) || id < 1) {
	  return res.status(400).json({ success: false, message: "ID sách không hợp lệ" });
	}
  
	next();
};

module.exports.validateCreateBook = (req, res, next) => {
	const { title, authorId, categoryId, price, rate } = req.body;
  
	if (!title) return res.status(400).json({ success: false, message: "Title không được để trống" });
	if (!authorId || isNaN(authorId)) return res.status(400).json({ success: false, message: "AuthorId không hợp lệ" });
	if (!categoryId || isNaN(categoryId)) return res.status(400).json({ success: false, message: "CategoryId không hợp lệ" });
	if (price && isNaN(price)) return res.status(400).json({ success: false, message: "Price phải là số" });
	if (rate && isNaN(rate)) return res.status(400).json({ success: false, message: "Rate phải là số" });
  
	next();
};
  
module.exports.validateReview = (req, res, next) => {
	const { content } = req.body;
	if (!content || content.trim() === "") {
	  return res.status(400).json({ success: false, message: "Nội dung review không được để trống" });
	}
	next();
};

module.exports.validateUpdateBook = (req, res, next) => {
	const { title, authorId, categoryId, price, rate } = req.body;
  
	if (title && typeof title !== "string") {
	  return res.status(400).json({ success: false, message: "Title must be a string" });
	}
	if (authorId && (isNaN(authorId) || authorId < 1)) {
	  return res.status(400).json({ success: false, message: "Invalid authorId" });
	}
	if (categoryId && (isNaN(categoryId) || categoryId < 1)) {
	  return res.status(400).json({ success: false, message: "Invalid categoryId" });
	}
	if (price && isNaN(price)) {
	  return res.status(400).json({ success: false, message: "Price must be a number" });
	}
	if (rate && isNaN(rate)) {
	  return res.status(400).json({ success: false, message: "Rate must be a number" });
	}
  
	next();
};
  