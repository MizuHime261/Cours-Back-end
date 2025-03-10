const jobService = require('../services/job.service');
const knex = require('../config/database');

// Get all
module.exports.getAllJobs = async (req, res, next) => {
    try {
        const { salaryMin, salaryMax, category, location, skill, page = 1, limit = 10, sort, order } = req.query;

        const jobs = await jobService.getFilteredJobs({
            salaryMin,
            salaryMax,
            category,
            location,
            skill,
            page,
            limit,
            sort,
            order,
        });

        res.json({ success: true, data: jobs });
    } catch (error) {
        next(error);
    }
};

// Get by id
module.exports.getJobById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const job = await jobService.getJobById(id);

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    res.json({ success: true, data: job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// Get job skills
module.exports.getJobSkills = async (req, res) => {
  try {
    const { id } = req.params;
    const skills = await jobService.getSkillsByJobId(id);

    if (!skills) {
      return res.status(404).json({ success: false, message: 'Skills not found' });
    }

    res.json({ success: true, data: skills });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// Create job
module.exports.createJob = async (req, res) => {
  try {
    const jobData = req.body;

    // Kiểm tra xem job đã tồn tại chưa
    const existingJob = await knex('Job')
      .select('jobId')
      .where('jobTitle', jobData.jobTitle)
      .first();

    if (existingJob) {
      return res.status(400).json({ success: false, message: 'Job already exists' });
    }

    // Tạo job mới
    const newJob = await jobService.createJob(jobData);

    res.status(201).json({ success: true, message: 'Create successfully', data: newJob });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create skills by id
module.exports.createJobSkills = async (req, res) => {
  try {
    const { id } = req.params; // jobId từ URL
    const { skillIds } = req.body; // Danh sách skillId từ body

    if (!Array.isArray(skillIds) || skillIds.length === 0) {
        return res.status(400).json({ message: "Invalid skills data" });
    }

    // Gọi service để thêm skill vào job
    const result = await jobService.addSkillsToJob(id, skillIds);
    res.status(201).json({ message: "Skills added successfully", result });
  } catch (error) {
      console.error("Error adding skills to job:", error);
      res.status(500).json({ message: "Internal server error" });
  }
};

// Update job
module.exports.updateJob = async (req, res) => {
  try {
      const { id } = req.params;
      const updatedData = req.body; // Dữ liệu cần cập nhật

      // Gọi service để cập nhật job
      await jobService.updateJob(id, updatedData);

      res.status(200).json({ message: "Update successfully" });
  } catch (error) {
      console.error("Error updating job:", error);
      res.status(500).json({ message: "Internal server error" });
  }
};

// Delete job
module.exports.deleteJob = async (req, res) => {
  try {
      const { id } = req.params;

      // Gọi service để xóa job
      await jobService.deleteJob(id);

      res.status(200).json({ message: "Delete successfully" });
  } catch (error) {
      console.error("Error deleting job:", error);
      res.status(500).json({ message: "Internal server error" });
  }
};
