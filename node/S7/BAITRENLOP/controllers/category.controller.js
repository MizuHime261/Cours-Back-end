const categoryService = require("../services/category.service");

module.exports.getCategories = async function (req, res) {
  try {
    const categories = await categoryService.getCategories(req.query);
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi server", error });
  }
};

module.exports.getCategoryById = async function (req, res) {
	try {
	  const categoryId = req.params.id;
	  const category = await categoryService.getCategoryById(categoryId);
  
	  if (!category) {
		return res.status(404).json({ success: false, message: "Category not found" });
	  }
  
	  res.json({ success: true, data: category });
	} catch (error) {
	  res.status(500).json({ success: false, message: "Lỗi server", error });
	}
};

module.exports.getBooksByCategory = async function (req, res) {
	try {
	  const categoryId = req.params.id;
	  const books = await categoryService.getBooksByCategory(categoryId, req.query);
  
	  res.json({ success: true, data: books });
	} catch (error) {
	  res.status(500).json({ success: false, message: "Lỗi server", error });
	}
};

module.exports.createCategory = async function (req, res) {
	try {
	  const { name } = req.body;
  
	  if (!name) {
		return res.status(400).json({ success: false, message: "Name is required" });
	  }
  
	  const newCategory = await categoryService.createCategory({ name });
  
	  res.status(201).json({
		success: true,
		message: "Create successfully",
		data: newCategory,
	  });
	} catch (error) {
	  res.status(500).json({ success: false, message: "Lỗi server", error });
	}
};

module.exports.updateCategory = async function (req, res) {
	try {
	  const categoryId = req.params.id;
	  const { categoryName } = req.body;
  
	  const category = await categoryService.getCategoryById(categoryId);
	  if (!category) {
		return res.status(404).json({ success: false, message: "Category not found" });
	  }
  
	  await categoryService.updateCategory(categoryId, categoryName);
  
	  res.json({ success: true, message: "Update successfully" });
	} catch (error) {
	  res.status(500).json({ success: false, message: "Lỗi server", error });
	}
};

module.exports.deleteCategory = async function (req, res) {
	try {
	  const categoryId = req.params.id;
  
	  const category = await categoryService.getCategoryById(categoryId);
	  if (!category) {
		return res.status(404).json({ success: false, message: "Category not found" });
	  }
  
	  await categoryService.deleteCategory(categoryId);
  
	  res.json({ success: true, message: "Delete successfully" });
	} catch (error) {
	  res.status(500).json({ success: false, message: "Lỗi server", error });
	}
};