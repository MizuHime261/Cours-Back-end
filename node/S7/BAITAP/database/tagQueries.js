const pool = require('./database');

// 🔹 1. Lấy danh sách Tags với Filter, Pagination, Sort
async function getTags({ productId, page = 1, limit = 10, sort = 'tagId', order = 'asc' }) {
    let query = `SELECT * FROM Tag`;
    let queryParams = [];

    // 🔸 Lọc theo productId nếu có
    if (productId) {
        query = `
            SELECT Tag.* FROM Tag
            JOIN Product_Tag ON Tag.tagId = Product_Tag.tagId
            WHERE Product_Tag.productId = ?
        `;
        queryParams.push(productId);
    }

    // 🔸 Sắp xếp dữ liệu
    query += ` ORDER BY ${sort} ${order.toUpperCase()}`;

    // 🔸 Pagination
    const offset = (page - 1) * limit;
    query += ` LIMIT ? OFFSET ?`;
    queryParams.push(parseInt(limit), parseInt(offset));

    const [tags] = await pool.query(query, queryParams);
    return tags;
}

// 🔹 2. Lấy tag theo ID
async function getTagById(tagId) {
    const query = `SELECT * FROM Tag WHERE tagId = ?`;
    const [rows] = await pool.query(query, [tagId]);
    return rows.length ? rows[0] : null;
}

// 🔹 3. Lấy sản phẩm theo tagId
async function getProductsByTag(tagId) {
    const query = `
        SELECT p.id, p.productName, p.status 
        FROM Product p
        JOIN Product_Tag pt ON p.id = pt.productId
        WHERE pt.tagId = ?;
    `;
    const [rows] = await pool.query(query, [tagId]);
    return rows;
}

// 🔹 4. Thêm tag mới
async function createTag(tagName) {
    const query = `INSERT INTO Tag (tagName) VALUES (?)`;
    const [result] = await pool.query(query, [tagName]);
    return { tagId: result.insertId, tagName };
}

// 🔹 5. Kiểm tra tag có tồn tại không
async function checkTagExists(tagId) {
    const query = `SELECT * FROM Tag WHERE tagId = ?`;
    const [rows] = await pool.query(query, [tagId]);
    return rows.length > 0;
}

// 🔹 6. Cập nhật tag
async function updateTag(tagId, tagName) {
    const query = `UPDATE Tag SET tagName = ? WHERE tagId = ?`;
    await pool.query(query, [tagName, tagId]);
}

// 🔹 7. Kiểm tra tag có đang được sử dụng không
async function isTagUsed(tagId) {
    const query = `SELECT COUNT(*) AS count FROM Product_Tag WHERE tagId = ?`;
    const [rows] = await pool.query(query, [tagId]);
    return rows[0].count > 0;
}

// 🔹 8. Xóa tag
async function deleteTag(tagId) {
    const query = `DELETE FROM Tag WHERE tagId = ?`;
    await pool.query(query, [tagId]);
}

module.exports = {
    getTags, getTagById, getProductsByTag,
    createTag, checkTagExists, updateTag,
    isTagUsed, deleteTag
};
