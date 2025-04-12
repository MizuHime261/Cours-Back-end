const express = require('express');
const router = express.Router();
// const jobController = require('../controllers/job.controller');
// const jobMiddleware = require('../middlewares/job.middleware');

// GET all jobs
router.get('/', function (req, res) {
	res.jon('all jobs');
});

// GET a job by ID
router.get('/:id', function (req, res) {
	res.json('job by id');
});

// Get skills for a job
router.get('/:id/skills', function (req, res) {
	res.json('skills for job');
});
// POST a new job
router.post('/', function (req, res) {
	res.json('new job');
});

// PUT update a job by ID
router.put('/:id', function (req, res) {
	res.json('update job');
});

// DELETE a job by ID
router.delete('/:id', function (req, res) {
	res.json('delete job');
});

module.exports = router;