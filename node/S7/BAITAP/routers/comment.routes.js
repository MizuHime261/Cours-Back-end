const express = require('express');
const {
    getComments, getCommentById, createComment,
    updateComment, deleteComment
} = require('../database/commentQueries');

const router = express.Router();

// 🔹 1. GET /api/v1/comments → Lấy danh sách comments với filter, pagination, sort
router.get('/', async (req, res) => {
    try {
        const { productId, page = 1, limit = 10, sort = 'commentId', order = 'asc' } = req.query;
        const comments = await getComments({ productId, page, limit, sort, order });

        res.json({ status: 'success', page: parseInt(page), limit: parseInt(limit), total: comments.length, data: comments });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Lỗi server', error: error.message });
    }
});

// 🔹 2. GET /api/v1/comments/:id → Lấy chi tiết comment
router.get('/:id', async (req, res) => {
    const comment = await getCommentById(req.params.id);
    if (!comment) return res.status(404).json({ status: 'error', message: 'Comment not found' });
    res.json({ status: 'success', data: comment });
});

// 🔹 3. POST /api/v1/comments → Thêm comment mới
router.post('/', async (req, res) => {
    try {
        const { productId, content } = req.body;
        if (!productId || !content) return res.status(400).json({ status: 'error', message: 'productId và content là bắt buộc' });

        await createComment(productId, content);
        res.status(201).json({ status: 'success', message: 'Create successfully' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Lỗi server', error: error.message });
    }
});

// 🔹 4. PUT /api/v1/comments/:id → Cập nhật comment
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    if (!content) return res.status(400).json({ status: 'error', message: 'content là bắt buộc' });

    const updated = await updateComment(id, content);
    if (!updated) return res.status(404).json({ status: 'error', message: 'Comment not found' });

    res.json({ status: 'success', message: 'Update successfully' });
});

// 🔹 5. DELETE /api/v1/comments/:id → Xóa comment
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const deleted = await deleteComment(id);
    if (!deleted) return res.status(404).json({ status: 'error', message: 'Comment not found' });

    res.json({ status: 'success', message: 'Delete successfully' });
});

module.exports = router;