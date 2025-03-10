const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');

router.get('/', categoryController.getCategories);

router.get('/:id', categoryController.getCategoryById);

router.get('/:id/jobs', categoryController.getJobsByCategory);

router.post('/', categoryController.createCategory);

router.put('/:id', categoryController.updateCategory);

router.delete('/:id', categoryController.deleteCategory);

module.exports = router;