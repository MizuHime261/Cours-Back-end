const knex = require('../config/database');
const { v4: uuidv4 } = require('uuid');

// Get all
exports.getFilteredJobs = async ({ salaryMin, salaryMax, category, location, skill, page, limit, sort, order }) => {
    let query = knex('Job as j')
        .select(
            'j.jobId', 'j.jobTitle', 'j.jobDescription', 'j.jobRequirement', 'j.salaryMin', 'j.salaryMax',
            'c.companyId', 'c.name as companyName', 'c.logo',
            knex.raw('COALESCE(CONCAT("[", GROUP_CONCAT(DISTINCT JSON_QUOTE(cat.name)), "]"), "[]") as categories'),
            knex.raw('COALESCE(CONCAT("[", GROUP_CONCAT(DISTINCT JSON_QUOTE(s.name)), "]"), "[]") as skills'),
            knex.raw('COALESCE(CONCAT("[", GROUP_CONCAT(DISTINCT JSON_QUOTE(l.name)), "]"), "[]") as locations'),
            knex.raw('COALESCE(CONCAT("[", GROUP_CONCAT(DISTINCT JSON_QUOTE(b.name)), "]"), "[]") as benefits')

        )
        .leftJoin('Company as c', 'j.companyId', 'c.companyId')
        .leftJoin('JobCategory as jc', 'j.jobId', 'jc.jobId')
        .leftJoin('Category as cat', 'jc.categoryId', 'cat.categoryId')
        .leftJoin('JobSkill as js', 'j.jobId', 'js.jobId')
        .leftJoin('Skill as s', 'js.skillId', 's.skillId')
        .leftJoin('JobLocation as jl', 'j.jobId', 'jl.jobId')
        .leftJoin('Location as l', 'jl.locationId', 'l.locationId')
        .leftJoin('JobBenefit as jb', 'j.jobId', 'jb.jobId')
        .leftJoin('Benefit as b', 'jb.benefitId', 'b.benefitId')
        .groupBy('j.jobId');

    // **Filter theo salary**
    if (salaryMin) query.where('j.salaryMin', '>=', salaryMin);
    if (salaryMax) query.where('j.salaryMax', '<=', salaryMax);

    // **Filter theo category**
    if (category) query.where('cat.name', category);

    // **Filter theo location**
    if (location) query.where('l.name', location);

    // **Filter theo skills (dùng `whereIn` để lọc nhiều skill)**
    if (skill) query.whereIn('s.name', skill);

    // **Pagination**
    const offset = (page - 1) * limit;
    query.limit(limit).offset(offset);

    // **Sort**
    if (sort) query.orderBy(sort, order || 'asc');

    const jobs = await query;

    // **Xử lý JSON & Loại bỏ dữ liệu trùng lặp trong Node.js**
    const transformData = (jobs) => {
        return jobs.map(job => ({
            ...job,
            categories: [...new Set(JSON.parse(job.categories || '[]'))], // Loại bỏ trùng lặp
            skills: [...new Set(JSON.parse(job.skills || '[]'))],
            locations: [...new Set(JSON.parse(job.locations || '[]'))],
            benefits: [...new Set(JSON.parse(job.benefits || '[]'))]
        }));
    };

    return transformData(jobs);
};

// Get by ID
module.exports.getJobById = async (iobId) => {
    const job = await knex('Job as j')
       .select(
            'j.jobId', 'j.jobTitle', 'j.jobDescription', 'j.jobRequirement', 'j.salaryMin', 'j.salaryMax',
            'c.companyId', 'c.name as companyName', 'c.logo',
            knex.raw('COALESCE(CONCAT("[", GROUP_CONCAT(DISTINCT JSON_QUOTE(cat.name)), "]"), "[]") as categories'),
            knex.raw('COALESCE(CONCAT("[", GROUP_CONCAT(DISTINCT JSON_QUOTE(s.name)), "]"), "[]") as skills'),
            knex.raw('COALESCE(CONCAT("[", GROUP_CONCAT(DISTINCT JSON_QUOTE(l.name)), "]"), "[]") as locations'),
            knex.raw('COALESCE(CONCAT("[", GROUP_CONCAT(DISTINCT JSON_QUOTE(b.name)), "]"), "[]") as benefits')
        )
        .leftJoin('Company as c', 'j.companyId', 'c.companyId')
        .leftJoin('JobCategory as jc', 'j.jobId', 'jc.jobId')
        .leftJoin('Category as cat', 'jc.categoryId', 'cat.categoryId')
        .leftJoin('JobSkill as js', 'j.jobId', 'js.jobId')
        .leftJoin('Skill as s', 'js.skillId', 's.skillId')
        .leftJoin('JobLocation as jl', 'j.jobId', 'jl.jobId')
        .leftJoin('Location as l', 'jl.locationId', 'l.locationId')
        .leftJoin('JobBenefit as jb', 'j.jobId', 'jb.jobId')
        .leftJoin('Benefit as b', 'jb.benefitId', 'b.benefitId')
        .where('j.jobId', iobId)
        .first();

      if (!job) {
        return null;
      }
      return {
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
        categories: JSON.parse(job.categories),
        skills: JSON.parse(job.skills),
        locations: JSON.parse(job.locations),
        benefits: JSON.parse(job.benefits),
    };
}

// Get job skills
module.exports.getSkillsByJobId = async (jobId) => {
  return await knex('JobSkill')
    .select('Skill.name')
    .join('Skill', 'JobSkill.skillId', 'Skill.skillId')
    .where('JobSkill.jobId', jobId);
};

// Create job
module.exports.createJob = async (jobData) => {
  // Tạo jobId ngẫu nhiên duy nhất

  const newJob = {
    jobTitle: jobData.jobTitle,
    jobDescription: jobData.jobDescription,
    jobRequirement: jobData.jobRequirement,
    salaryMin: jobData.salaryMin,
    salaryMax: jobData.salaryMax,
    companyId: jobData.companyId
  };

  // Thêm vào database và lấy job vừa tạo
  await knex('Job').insert(newJob);

  if (jobData.categories && jobData.categories.length > 0) {
    const jobCategories = jobData.categories.map(categoryId => ({
        jobId,
        categoryId,
    }));
    await knex('JobCategory').insert(jobCategories);
  }

  // Nếu có skills, chèn vào bảng `JobSkill`
  if (jobData.skills && jobData.skills.length > 0) {
      const jobSkills = jobData.skills.map(skillId => ({
          jobId,
          skillId,
      }));
      await knex('JobSkill').insert(jobSkills);
  }

  // Nếu có locations, chèn vào bảng `JobLocation`
  if (jobData.locations && jobData.locations.length > 0) {
      const jobLocations = jobData.locations.map(locationId => ({
          jobId,
          locationId,
      }));
      await knex('JobLocation').insert(jobLocations);
  }

  // Nếu có benefits, chèn vào bảng `JobBenefit`
  if (jobData.benefits && jobData.benefits.length > 0) {
      const jobBenefits = jobData.benefits.map(benefit => ({
          jobId,
          benefitId: benefit.benefitId,
          value: benefit.value,
      }));
      await knex('JobBenefit').insert(jobBenefits);
  }

  return newJob;
};

module.exports.addSkillsToJob = async (jobId, skillIds) => {
  try {
      // Kiểm tra xem job có tồn tại không
      const jobExists = await knex('Job').where({ jobId }).first();
      if (!jobExists) {
          throw new Error("Job not found");
      }

      // Lọc ra các skillId hợp lệ
      const validSkills = await knex('Skill').whereIn('skillId', skillIds);
      const validSkillIds = validSkills.map(skill => skill.skillId);

      if (validSkillIds.length === 0) {
          throw new Error("No valid skills found");
      }

      // Chuẩn bị dữ liệu để chèn vào bảng JobSkill
      const jobSkills = validSkillIds.map(skillId => ({
          jobId,
          skillId
      }));

      // Chèn dữ liệu vào bảng JobSkill
      await knex('JobSkill').insert(jobSkills);

      return jobSkills;
  } catch (error) {
      throw error;
  }
};

// Put 
module.exports.updateJob = async (jobId, updatedData) => {
  try {
      await knex('Job').where({ jobId }).update(updatedData);
  } catch (error) {
      throw error;
  }
};

// Delete
module.exports.deleteJob = async (jobId) => {
  try {
    await knex('Job').where({ jobId }).del();
  } catch (error) {
      throw error;
  }
};