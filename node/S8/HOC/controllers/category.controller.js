const categoryService = require('../services/category.service');

module.exports.getCategories = async (req, res) => {
    try {
        const { page = 1, limit = 10, sort = 'categoryId', order = 'asc' } = req.query;

        const categories = await categoryService.getCategories({ page, limit, sort, order });

        res.status(200).json(categories);
    } catch (error) {
        console.error("Error getting categories:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports.getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await categoryService.getCategoryById(id);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json(category);
    } catch (error) {
        console.error("Error getting category by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports.getJobsByCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const data = await categoryService.getJobsByCategoryId(categoryId);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Category name is required" });
        }

        // Gọi service để thêm category mới
        await categoryService.createCategory(name);

        res.status(201).json({ message: "Create successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Category name is required" });
        }

        // Gọi service để cập nhật category
        const updated = await categoryService.updateCategory(categoryId, name);

        if (!updated) {
            return res.status(404).json({ message: "category not found" });
        }

        res.status(200).json({ message: "Update successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;

        // Gọi service để xóa category
        const deleted = await categoryService.deleteCategory(categoryId);

        if (!deleted) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({ message: "Delete successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};