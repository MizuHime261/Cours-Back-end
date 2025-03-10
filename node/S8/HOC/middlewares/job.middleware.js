const knex = require('../config/database');

const safeParseJSON = (data) => {
  try {
      return JSON.parse(data);
  } catch (error) {
      return []; // Nếu lỗi thì trả về mảng rỗng
  }
};

// Middleware xử lý dữ liệu trả về
module.exports.transformData = (req, res, next) => {
  if (!res.locals.jobs) return next();

  const transformedJobs = res.locals.jobs.map(job => ({
      jobId: job.jobId,
      jobTitle: job.jobTitle,
      jobDescription: job.jobDescription,
      jobRequirement: job.jobRequirement,
      salary: { min: job.salaryMin, max: job.salaryMax },
      company: {
          id: job.companyId,
          name: job.companyName,
          logo: job.logo,
      },
      categories: safeParseJSON(job.categories),
      skills: safeParseJSON(job.skills),
      locations: safeParseJSON(job.locations),
      benefits: safeParseJSON(job.benefits),
  }));

  res.json({ success: true, data: transformedJobs });
};

// Check job title exists

module.exports.checkJobExists = async (req, res, next) => {
  try {
    const { jobTitle } = req.body;

    if (!jobTitle) {
      return res.status(400).json({ success: false, message: 'Job title is required' });
    }

    const job = await knex('Job')
      .select('jobId')
      .where('jobTitle', jobTitle)
      .first();

    if (job) {
      return res.status(400).json({ success: false, message: 'Job already exists' });
    }

    next(); // Nếu không tìm thấy job, tiếp tục tạo job mới
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Check job id exists
module.exports.checkJobIdExists = async (req, res, next) => {
  const { id } = req.params;

  try {
    const job = await knex('Job').where({ jobId: id }).first();
    if (!job) {
        return res.status(404).json({ message: "Job not found" });
    }
    req.job = job; // Lưu job vào request để sử dụng sau này
    next();
  } catch (error) {
      console.error("Error checking job existence:", error);
      res.status(500).json({ message: "Internal server error" });
  }
};