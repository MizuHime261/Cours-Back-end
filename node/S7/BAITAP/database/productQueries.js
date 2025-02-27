const pool = require('./database');

// 🔹 1. Lấy danh sách Products với Listing, Comments, Tags, Filter, Pagination, Sort
async function getProducts({ minRate, maxRate, page = 1, limit = 10, sort = 'id', order = 'asc' }) {
    let query = `
        SELECT p.*, 
            l.description, l.price, l.rate, 
            GROUP_CONCAT(DISTINCT c.content SEPARATOR ', ') AS comments, 
            GROUP_CONCAT(DISTINCT t.tagName SEPARATOR ', ') AS tags
        FROM Product p
        LEFT JOIN Listing l ON p.id = l.productId
        LEFT JOIN Comment c ON p.id = c.productId
        LEFT JOIN Product_Tag pt ON p.id = pt.productId
        LEFT JOIN Tag t ON pt.tagId = t.tagId
        WHERE 1=1`;
    let queryParams = [];

    // 🔸 Lọc theo rating nếu có
    if (minRate) {
        query += ` AND l.rate >= ?`;
        queryParams.push(minRate);
    }
    if (maxRate) {
        query += ` AND l.rate <= ?`;
        queryParams.push(maxRate);
    }

    // 🔸 Group by productId
    query += ` GROUP BY p.id, l.description, l.price, l.rate`;

    // 🔸 Sắp xếp dữ liệu
    query += ` ORDER BY ${sort} ${order.toUpperCase()}`;

    // 🔸 Pagination
    const offset = (page - 1) * limit;
    query += ` LIMIT ? OFFSET ?`;
    queryParams.push(parseInt(limit), parseInt(offset));

    const [products] = await pool.query(query, queryParams);
    return products;
}

// 🔹 2. Lấy sản phẩm theo ID
async function getProductById(id) {
    const query = `SELECT * FROM Product WHERE id = ?`;
    const [rows] = await pool.query(query, [id]);
    return rows.length ? rows[0] : null;
}

async function getListingByProductId(id) {
    try {
        const query = `SELECT * FROM Listing WHERE productId = ?`;
        const [rows] = await pool.query(query, [id]);
        return rows.length ? rows[0] : {}; // Trả về object rỗng nếu không có dữ liệu
    } catch (error) {
        console.error('Lỗi khi lấy listing:', error);
        throw error; // Ném lỗi để xử lý ở cấp cao hơn
    }
}


// 🔹 4. Lấy Tags của sản phẩm
async function getProductTags(id) {
    const query = `
        SELECT t.* FROM Tag t
        JOIN Product_Tag pt ON t.tagId = pt.tagId
        WHERE pt.productId = ?`;
    const [rows] = await pool.query(query, [id]);
    return rows;
}

// 🔹 5. Lấy Comments của sản phẩm
async function getProductComments(id) {
    const query = `SELECT * FROM Comment WHERE productId = ?`;
    const [rows] = await pool.query(query, [id]);
    return rows;
}

// 🔹 6. Tạo mới Product (và Listing nếu có)
async function createProduct({ productName, status, listing }) {
    // Kiểm tra sản phẩm đã tồn tại chưa
    const existingProduct = await getProductByName(productName);
    if (existingProduct) return null;
    
    // Tạo sản phẩm
    const query = `INSERT INTO Product (productName, status) VALUES (?, ?)`;
    const [result] = await pool.query(query, [productName, status]);
    const productId = result.insertId;

    // Nếu có listing, thêm listing
    if (listing) {
        const listingQuery = `INSERT INTO Listing (productId, description, price, rate) VALUES (?, ?, ?, ?)`;
        await pool.query(listingQuery, [productId, listing.description, listing.price, listing.rate]);
    }
    return { id: productId, productName, status };
}

// 🔹 7. Kiểm tra sản phẩm đã tồn tại chưa
async function getProductByName(productName) {
    const query = `SELECT * FROM Product WHERE productName = ?`;
    const [rows] = await pool.query(query, [productName]);
    return rows.length ? rows[0] : null;
}

// 🔹 8. Cập nhật Product
async function updateProduct(id, { productName, status }) {
    const query = `UPDATE Product SET productName = ?, status = ? WHERE id = ?`;
    await pool.query(query, [productName, status, id]);
}

// 🔹 9. Xóa Product
async function deleteProduct(id) {
    const query = `DELETE FROM Product WHERE id = ?`;
    await pool.query(query, [id]);
}

module.exports = {
    getProducts, getProductById, getListingByProductId,
    getProductTags, getProductComments, createProduct,
    getProductByName, updateProduct, deleteProduct
};