const reviewService = require("../services/review.service");

module.exports.getAllReviews = async function (req, res) {
  try {
    const { bookId, page = 1, limit = 10, sort = "reviewId", order = "asc" } = req.query;

    const options = {
      bookId: bookId ? parseInt(bookId) : null,
      page: parseInt(page),
      limit: parseInt(limit),
      sort,
      order: order.toLowerCase() === "desc" ? "desc" : "asc",
    };

    const reviews = await reviewService.getAllReviews(options);

    res.json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi server", error });
  }
};

module.exports.createReview = async function (req, res) {
	try {
	  const { bookId, content } = req.body;
  
	  // Kiểm tra dữ liệu đầu vào
	  if (!bookId || !content) {
		return res.status(400).json({ success: false, message: "bookId và content là bắt buộc" });
	  }
  
	  // Gọi service để thêm review
	  const newReview = await reviewService.createReview({ bookId, content });
  
	  res.status(201).json({ success: true, message: "Create successfully", data: newReview });
	} catch (error) {
	  res.status(500).json({ success: false, message: "Lỗi server", error });
	}
};

module.exports.getReviewById = async function (req, res) {
	try {
	  const { reviewId } = req.params;
  
	  // Gọi service để lấy thông tin review
	  const review = await reviewService.getReviewById(reviewId);
  
	  if (!review) {
		return res.status(404).json({ success: false, message: "Review not found" });
	  }
  
	  res.status(200).json({ success: true, data: review });
	} catch (error) {
	  res.status(500).json({ success: false, message: "Lỗi server", error });
	}
};

module.exports.updateReview = async function (req, res) {
	try {
	  const { reviewId } = req.params;
	  const { content } = req.body;
  
	  if (!content) {
		return res.status(400).json({ success: false, message: "Content is required" });
	  }
  
	  // Gọi service để cập nhật review
	  const updated = await reviewService.updateReview(reviewId, content);
  
	  if (!updated) {
		return res.status(404).json({ success: false, message: "Review not found" });
	  }
  
	  res.status(200).json({ success: true, message: "Update successfully" });
	} catch (error) {
	  res.status(500).json({ success: false, message: "Lỗi server", error });
	}
};

module.exports.deleteReview = async function (req, res) {
	try {
	  const { reviewId } = req.params;
  
	  // Gọi service để xóa review
	  const deleted = await reviewService.deleteReview(reviewId);
  
	  if (!deleted) {
		return res.status(404).json({ success: false, message: "Review not found" });
	  }
  
	  res.status(200).json({ success: true, message: "Delete successfully" });
	} catch (error) {
	  res.status(500).json({ success: false, message: "Lỗi server", error });
	}
};