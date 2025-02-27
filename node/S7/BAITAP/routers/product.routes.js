const express = require('express');
const {
    getProducts, getProductById, getListingByProductId,
    getProductTags, getProductComments, createProduct,
    getProductByName, updateProduct, deleteProduct, addCommentToProduct
} = require('../database/productQueries');

const router = express.Router();

// 1. GET /api/v1/products
router.get('/', async (req, res) => {
    try {
        const { minRate, maxRate, page = 1, limit = 10, sort = 'id', order = 'asc' } = req.query;
        const products = await getProducts({ minRate, maxRate, page, limit, sort, order });
        res.json({ status: 'success', page: parseInt(page), limit: parseInt(limit), total: products.length, data: products });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Lỗi server', error: error.message });
    }
});

// 2. GET /api/v1/products/:id
router.get('/:id', async (req, res) => {
    try {
        const product = await getProductById(req.params.id);
        if (!product) return res.status(404).json({ status: 'error', message: 'Product not found' });
        res.json({ status: 'success', data: product });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Lỗi server', error: error.message });
    }
});

// 3. GET /api/v1/products/:id/listing
router.get('/:id/listing', async (req, res) => {
    try {
        const listing = await getListingByProductId(req.params.id);
        res.json({ status: 'success', data: listing || {} });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Lỗi server', error: error.message });
    }
});

// 4. GET /api/v1/products/:id/tags
router.get('/:id/tags', async (req, res) => {
    try {
        const tags = await getProductTags(req.params.id);
        res.json({ status: 'success', data: tags });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Lỗi server', error: error.message });
    }
});

// 5. GET /api/v1/products/:id/comments
router.get('/:id/comments', async (req, res) => {
    try {
        const comments = await getProductComments(req.params.id);
        res.json({ status: 'success', data: comments });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Lỗi server', error: error.message });
    }
});

// 6. POST /api/v1/products
router.post('/', async (req, res) => {
    try {
        const { productName, listing } = req.body;
        if (!productName) return res.status(400).json({ status: 'error', message: 'productName là bắt buộc' });

        if (await getProductByName(productName)) {
            return res.status(400).json({ status: 'error', message: 'Product already exists' });
        }

        const newProduct = await createProduct({ productName, listing });
        res.status(201).json({ status: 'success', data: newProduct });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Lỗi server', error: error.message });
    }
});

// 7. POST /api/v1/products/:id/comments
router.post('/:id/comments', async (req, res) => {
    try {
        const { content } = req.body;
        if (!content) return res.status(400).json({ status: 'error', message: 'content là bắt buộc' });

        await addCommentToProduct(req.params.id, content);
        res.status(201).json({ status: 'success', message: 'Comment added successfully' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Lỗi server', error: error.message });
    }
});

// 8. PUT /api/v1/products/:id
router.put('/:id', async (req, res) => {
    try {
        const { productName } = req.body;
        if (!productName) return res.status(400).json({ status: 'error', message: 'productName là bắt buộc' });

        if (!await getProductById(req.params.id)) {
            return res.status(404).json({ status: 'error', message: 'Product not found' });
        }

        await updateProduct(req.params.id, { productName });
        res.json({ status: 'success', message: 'Update successfully' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Lỗi server', error: error.message });
    }
});

// 9. DELETE /api/v1/products/:id
router.delete('/:id', async (req, res) => {
    try {
        if (!await getProductById(req.params.id)) {
            return res.status(404).json({ status: 'error', message: 'Product not found' });
        }

        await deleteProduct(req.params.id);
        res.json({ status: 'success', message: 'Delete successfully' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Lỗi server', error: error.message });
    }
});

module.exports = router;