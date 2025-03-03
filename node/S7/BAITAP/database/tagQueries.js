const knex = require('./database');

// 🔹 1. Lấy danh sách Tags với Filter, Pagination, Sort
async function getTags({ productId, page = 1, limit = 10, sort = 'tagId', order = 'asc' }) {
    let query = knex('Tag').select('*').orderBy(sort, order).limit(limit).offset((page - 1) * limit);

    if (productId) {
        query = knex('Tag as t')
            .join('Product_Tag as pt', 't.tagId', 'pt.tagId')
            .where('pt.productId', productId)
            .select('t.*')
            .orderBy(sort, order)
            .limit(limit)
            .offset((page - 1) * limit);
    }

    return await query;
}

// 🔹 2. Lấy tag theo ID
async function getTagById(tagId) {
    return await knex('Tag').where('tagId', tagId).first();
}

// 🔹 3. Lấy sản phẩm theo tagId
async function getProductsByTag(tagId) {
    return await knex('Product as p')
        .join('Product_Tag as pt', 'p.id', 'pt.productId')
        .where('pt.tagId', tagId)
        .select('p.id', 'p.productName', 'p.status');
}

// 🔹 4. Thêm tag mới
async function createTag(tagName) {
    const [tagId] = await knex('Tag').insert({ tagName });
    return { tagId, tagName };
}

// 🔹 5. Kiểm tra tag có tồn tại không
async function checkTagExists(tagId) {
    const tag = await knex('Tag').where('tagId', tagId).first();
    return !!tag;
}

// 🔹 6. Cập nhật tag
async function updateTag(tagId, tagName) {
    return await knex('Tag').where('tagId', tagId).update({ tagName });
}

// 🔹 7. Kiểm tra tag có đang được sử dụng không
async function isTagUsed(tagId) {
    const result = await knex('Product_Tag').where('tagId', tagId).count('* as count');
    return result[0].count > 0;
}

// 🔹 8. Xóa tag
async function deleteTag(tagId) {
    return await knex('Tag').where('tagId', tagId).del();
}

module.exports = {
    getTags, getTagById, getProductsByTag,
    createTag, checkTagExists, updateTag,
    isTagUsed, deleteTag
};