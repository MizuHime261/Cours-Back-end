const knex = require('../config/database');

module.exports.getCategories = async ({ page, limit, sort, order }) => {
    try {
        const offset = (page - 1) * limit;

        const categories = await knex('Category')
            .select('categoryId', 'name')
            .orderBy(sort, order)
            .limit(limit)
            .offset(offset);

        return categories;
    } catch (error) {
        throw error;
    }
};

module.exports.getCategoryById = async (id) => {
    try {
        const category = await knex('Category')
            .select('categoryId', 'name')
            .where('categoryId', id)
            .first(); // Chỉ lấy 1 dòng

        return category;
    } catch (error) {
        throw error;
    }
};

module.exports.getJobsByCategoryId = async (categoryId) => {
    try {
        const jobs = await knex('Job')
		.select('Category.name as categoryName', 'Job.jobId', 'Job.jobTitle')
		.join('JobCategory', 'Job.jobId', 'JobCategory.jobId')
        .join('Category', 'JobCategory.categoryId', 'Category.categoryId')
    	.where('Category.categoryId', categoryId);
        // Nhóm dữ liệu theo categoryName
        const result = jobs.reduce((acc, job) => {
            let category = acc.find(c => c.categoryName === job.categoryName);
            if (!category) {
                category = { categoryName: job.categoryName, jobs: [] };
                acc.push(category);
            }
            category.jobs.push({ jobId: job.jobId, jobTitle: job.jobTitle });
            return acc;
        }, []);

        return { categories: result };
    } catch (error) {
        throw new Error(`Lỗi khi lấy jobs theo category: ${error.message}`);
    }
};

module.exports.createCategory = async (name) => {
    try {
        await knex('Category').insert({ name });
    } catch (error) {
        throw new Error(`Lỗi khi thêm category: ${error.message}`);
    }
};

module.exports.updateCategory = async (categoryId, name) => {
    try {
        const updatedRows = await knex('Category')
            .where({ categoryId })
            .update({ name });

        return updatedRows > 0; // Trả về true nếu có ít nhất một hàng được cập nhật
    } catch (error) {
        throw new Error(`Lỗi khi cập nhật category: ${error.message}`);
    }
};

module.exports.deleteCategory = async (categoryId) => {
    try {
        const deletedRows = await knex('Category')
            .where({ categoryId })
            .del();

        return deletedRows > 0; // Trả về true nếu có ít nhất một hàng được xóa
    } catch (error) {
        throw new Error(`Lỗi khi xóa category: ${error.message}`);
    }
};