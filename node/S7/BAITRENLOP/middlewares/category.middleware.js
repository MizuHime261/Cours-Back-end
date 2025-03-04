module.exports.validateCategoryQuery = (req, res, next) => {
	const { page, limit, sort, order } = req.query;
  
	if (page && (isNaN(page) || page < 1)) {
	  return res.status(400).json({ success: false, message: "page phải >= 1" });
	}
	if (limit && (isNaN(limit) || limit < 1)) {
	  return res.status(400).json({ success: false, message: "limit phải >= 1" });
	}
	if (sort && !["categoryId", "categoryName"].includes(sort)) {
	  return res.status(400).json({ success: false, message: "sort không hợp lệ" });
	}
	if (order && !["asc", "desc"].includes(order)) {
	  return res.status(400).json({ success: false, message: "order phải là asc hoặc desc" });
	}
  
	next();
};

module.exports.validateCategoryId = (req, res, next) => {
	const { id } = req.params;
  
	if (!id || isNaN(id) || id < 1) {
	  return res.status(400).json({ success: false, message: "ID category không hợp lệ" });
	}
  
	next();
};

module.exports.validateCategoryBooks = (req, res, next) => {
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

module.exports.validateCategory = (req, res, next) => {
	const { name } = req.body;
  
	if (!name) {
	  return res.status(400).json({ success: false, message: "Name is required" });
	}
  
	next();
};  

module.exports.validateCategoryUpdate = (req, res, next) => {
	const { categoryName } = req.body;
  
	if (!categoryName || typeof categoryName !== "string") {
	  return res.status(400).json({ success: false, message: "categoryName là bắt buộc và phải là chuỗi" });
	}
  
	next();
};