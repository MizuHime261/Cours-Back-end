const knex = require('./database');

// 🔹 1. Lấy danh sách Products với Listing, Comments, Tags, Filter, Pagination, Sort
async function getProducts({ minRate, maxRate, page = 1, limit = 10, sort = 'id', order = 'asc' }) {
    let query = knex('Product as p')
        .leftJoin('Listing as l', 'p.id', 'l.productId')
        .leftJoin('Comment as c', 'p.id', 'c.productId')
        .leftJoin('Product_Tag as pt', 'p.id', 'pt.productId')
        .leftJoin('Tag as t', 'pt.tagId', 't.tagId')
        .select(
            'p.*',
            'l.description', 'l.price', 'l.rate',
            knex.raw('GROUP_CONCAT(DISTINCT c.content SEPARATOR ", ") as comments'),
            knex.raw('GROUP_CONCAT(DISTINCT t.tagName SEPARATOR ", ") as tags')
        )
        .groupBy('p.id', 'l.description', 'l.price', 'l.rate')
        .orderBy(sort, order)
        .limit(limit)
        .offset((page - 1) * limit);

    if (minRate) query = query.where('l.rate', '>=', minRate);
    if (maxRate) query = query.where('l.rate', '<=', maxRate);

    return await query;
}

// 🔹 2. Lấy sản phẩm theo ID
async function getProductById(id) {
    return await knex('Product').where('id', id).first();
}

async function getListingByProductId(id) {
    return await knex('Listing').where('productId', id).first() || {};
}

// 🔹 4. Lấy Tags của sản phẩm
async function getProductTags(id) {
    return await knex('Tag as t')
        .join('Product_Tag as pt', 't.tagId', 'pt.tagId')
        .where('pt.productId', id)
        .select('t.*');
}

// 🔹 5. Lấy Comments của sản phẩm
async function getProductComments(id) {
    return await knex('Comment').where('productId', id);
}

// 🔹 6. Tạo mới Product (và Listing nếu có)
async function createProduct({ productName, status, listing }) {
    const existingProduct = await getProductByName(productName);
    if (existingProduct) return null;

    const [productId] = await knex('Product').insert({ productName, status });
    
    if (listing) {
        await knex('Listing').insert({
            productId,
            description: listing.description,
            price: listing.price,
            rate: listing.rate
        });
    }
    return { id: productId, productName, status };
}

// 🔹 7. Kiểm tra sản phẩm đã tồn tại chưa
async function getProductByName(productName) {
    return await knex('Product').where('productName', productName).first();
}

// 🔹 8. Cập nhật Product
async function updateProduct(id, { productName, status }) {
    return await knex('Product').where('id', id).update({ productName, status });
}

// 🔹 9. Xóa Product
async function deleteProduct(id) {
    return await knex('Product').where('id', id).del();
}

module.exports = {
    getProducts, getProductById, getListingByProductId,
    getProductTags, getProductComments, createProduct,
    getProductByName, updateProduct, deleteProduct
};