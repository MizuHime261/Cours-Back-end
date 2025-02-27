const pool = require('./database');

// 🔹 1. Lấy danh sách comments với Filter, Pagination, Sort
async function getComments({ productId, page = 1, limit = 10, sort = 'commentId', order = 'asc' }) {
    let query = `SELECT * FROM Comment`;
    let queryParams = [];

    // 🔸 Lọc theo productId nếu có
    if (productId) {
        query += ` WHERE productId = ?`;
        queryParams.push(productId);
    }

    // 🔸 Sắp xếp dữ liệu
    query += ` ORDER BY ${sort} ${order.toUpperCase()}`;

    // 🔸 Pagination
    const offset = (page - 1) * limit;
    query += ` LIMIT ? OFFSET ?`;
    queryParams.push(parseInt(limit), parseInt(offset));

    const [comments] = await pool.query(query, queryParams);
    return comments;
}

// 🔹 2. Lấy comment theo ID
async function getCommentById(commentId) {
    const query = `SELECT * FROM Comment WHERE commentId = ?`;
    const [rows] = await pool.query(query, [commentId]);
    return rows.length ? rows[0] : null;
}

// 🔹 3. Thêm comment mới
async function createComment(productId, content) {
    const query = `INSERT INTO Comment (productId, content) VALUES (?, ?)`;
    const [result] = await pool.query(query, [productId, content]);
    return { commentId: result.insertId, productId, content };
}

// 🔹 4. Cập nhật comment
async function updateComment(commentId, content) {
    const query = `UPDATE Comment SET content = ? WHERE commentId = ?`;
    const [result] = await pool.query(query, [content, commentId]);
    return result.affectedRows > 0;
}

// 🔹 5. Xóa comment
async function deleteComment(commentId) {
    const query = `DELETE FROM Comment WHERE commentId = ?`;
    const [result] = await pool.query(query, [commentId]);
    return result.affectedRows > 0;
}

module.exports = {
    getComments, getCommentById, createComment,
    updateComment, deleteComment
};