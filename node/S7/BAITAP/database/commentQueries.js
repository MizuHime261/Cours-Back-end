const knex = require('./database');

// 🔹 1. Lấy danh sách comments với Filter, Pagination, Sort
async function getComments({ productId, page = 1, limit = 10, sort = 'commentId', order = 'asc' }) {
    let query = knex('Comment');

    // 🔸 Lọc theo productId nếu có
    if (productId) {
        query = query.where('productId', productId);
    }

    // 🔸 Sắp xếp dữ liệu
    query = query.orderBy(sort, order);

    // 🔸 Pagination
    query = query.limit(limit).offset((page - 1) * limit);

    return await query;
}

// 🔹 2. Lấy comment theo ID
async function getCommentById(commentId) {
    const comment = await knex('Comment').where('commentId', commentId).first();
    return comment || null;
}

// 🔹 3. Thêm comment mới
async function createComment(productId, content) {
    const [commentId] = await knex('Comment').insert({ productId, content });
    return { commentId, productId, content };
}

// 🔹 4. Cập nhật comment
async function updateComment(commentId, content) {
    const result = await knex('Comment').where('commentId', commentId).update({ content });
    return result > 0;
}

// 🔹 5. Xóa comment
async function deleteComment(commentId) {
    const result = await knex('Comment').where('commentId', commentId).del();
    return result > 0;
}

module.exports = {
    getComments, getCommentById, createComment,
    updateComment, deleteComment
};