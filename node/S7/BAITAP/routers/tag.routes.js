const express = require('express');
const {
    getTags, getTagById, getProductsByTag,
    createTag, checkTagExists, updateTag,
    isTagUsed, deleteTag
} = require('../database/tagQueries');

const router = express.Router();

// 🔹 1. GET /tags → Lấy danh sách tags với filter, pagination, sort
router.get('/', async (req, res) => {
    try {
        const { productId, page = 1, limit = 10, sort = 'tagId', order = 'asc' } = req.query;
        const tags = await getTags({ productId, page, limit, sort, order });

        res.json({ status: 'success', page: parseInt(page), limit: parseInt(limit), total: tags.length, data: tags });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Lỗi server', error: error.message });
    }
});

// 🔹 2. POST /tags → Thêm tag mới
router.post('/', async (req, res) => {
    try {
        const { tagName } = req.body;
        if (!tagName) return res.status(400).json({ status: 'error', message: 'tagName là bắt buộc' });

        const newTag = await createTag(tagName);
        res.status(201).json({ status: 'success', message: 'Create successfully', data: newTag });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Lỗi server', error: error.message });
    }
});

// 🔹 3. GET /tags/:tagId → Lấy chi tiết tag
router.get('/:tagId', async (req, res) => {
    const tag = await getTagById(req.params.tagId);
    if (!tag) return res.status(404).json({ status: 'error', message: 'Tag not found' });
    res.json({ status: 'success', data: tag });
});

// 🔹 4. PUT /tags/:tagId → Cập nhật tag
router.put('/:tagId', async (req, res) => {
    const { tagId } = req.params;
    const { tagName } = req.body;
    if (!tagName) return res.status(400).json({ status: 'error', message: 'tagName là bắt buộc' });

    if (!await checkTagExists(tagId)) return res.status(404).json({ status: 'error', message: 'Tag not found' });

    await updateTag(tagId, tagName);
    res.json({ status: 'success', message: 'Update successfully' });
});

// 🔹 5. DELETE /tags/:tagId → Xóa tag nếu không còn sản phẩm sử dụng
router.delete('/:tagId', async (req, res) => {
    const { tagId } = req.params;

    if (!await checkTagExists(tagId)) return res.status(404).json({ status: 'error', message: 'Tag not found' });
    if (await isTagUsed(tagId)) return res.status(400).json({ status: 'error', message: 'Cannot delete: Tag is still in use' });

    await deleteTag(tagId);
    res.json({ status: 'success', message: 'Delete successfully' });
});

// 🔹 6. GET /tags/:tagId/products → Lấy danh sách sản phẩm có tag này
router.get('/:tagId/products', async (req, res) => {
    const products = await getProductsByTag(req.params.tagId);
    res.json({ status: 'success', total: products.length, data: products });
});

module.exports = router;