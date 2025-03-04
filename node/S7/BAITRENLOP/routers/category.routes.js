const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");
const categoryMiddleware = require("../middlewares/category.middleware");

router.get("/", categoryMiddleware.validateCategoryQuery, categoryController.getCategories);

router.get("/:id", categoryMiddleware.validateCategoryId, categoryController.getCategoryById);

router.get("/:id/books", categoryMiddleware.validateCategoryBooks, categoryController.getBooksByCategory);

router.post("/", categoryMiddleware.validateCategory, categoryController.createCategory);

router.put("/:id", categoryMiddleware.validateCategoryId, categoryMiddleware.validateCategoryUpdate, categoryController.updateCategory);

router.delete("/:id", categoryMiddleware.validateCategoryId, categoryController.deleteCategory);

module.exports = router;