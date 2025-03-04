const knex = require("../config/database");

module.exports.getAllReviews = async function (options) {
  let query = knex("Reviews");

  // Filter theo bookId
  if (options.bookId) {
    query = query.where("bookId", options.bookId);
  }

  // Sắp xếp theo field và order
  query = query.orderBy(options.sort, options.order);

  // Pagination (giới hạn và offset)
  const offset = (options.page - 1) * options.limit;
  query = query.limit(options.limit).offset(offset);

  return await query;
};

module.exports.createReview = async function (reviewData) {
	const [newReviewId] = await knex("Reviews").insert(reviewData);
	return { reviewId: newReviewId, ...reviewData };
};

module.exports.getReviewById = async function (reviewId) {
	return knex("Reviews").where({ reviewId }).first();
};

module.exports.updateReview = async function (reviewId, content) {
	const result = await knex("Reviews")
	  .where({ reviewId })
	  .update({ content });
  
	return result > 0; // Trả về `true` nếu có bản ghi được cập nhật
};

module.exports.deleteReview = async function (reviewId) {
	const result = await knex("Reviews")
	  .where({ reviewId })
	  .del();
  
	return result > 0; // Trả về `true` nếu có bản ghi bị xóa
};