const express = require('express');
const router = express.Router();
const jobController = require('../controllers/job.controller');
const jobMiddleware = require('../middlewares/job.middleware');

router.get('/', jobMiddleware.transformData, jobController.getAllJobs);

router.get('/:id', jobMiddleware.transformData, jobController.getJobById);

router.get('/:id/skills', jobMiddleware.transformData, jobController.getJobSkills);

router.post('/', jobMiddleware.checkJobExists, jobController.createJob);

router.post('/:id/skills', jobController.createJobSkills);

router.put('/:id', jobMiddleware.checkJobIdExists, jobController.updateJob);

router.delete('/:id', jobMiddleware.checkJobIdExists, jobController.deleteJob);

module.exports = router;