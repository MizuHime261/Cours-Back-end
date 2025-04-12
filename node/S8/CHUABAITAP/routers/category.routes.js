const express = require('express');
const router = express.Router();
// const categoryController = require('../controllers/category.controller');

// Get all categories
router.get('/', function (req, res) {
	res.jon('all categories');
});

// Get a category by ID
router.get('/:id', function (req, res) {
	res.json('category by id');
});

// Get jobs for a category
router.get('/:id/jobs', function (req, res) {
	res.json('jobs for category');
});

// Add a new category
router.post('/', function (req, res) {
	res.json('new category');
});

// Update a category by ID

router.put('/:id', function (req, res) {
    res.json('category updated');
});

// Delete a category by ID
router.delete('/:id', function (req, res) {
	res.json('category deleted');
});

module.exports = router;