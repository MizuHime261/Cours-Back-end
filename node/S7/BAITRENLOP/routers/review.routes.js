const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/review.controller");

router.get("/", reviewController.getAllReviews);

router.post("/", reviewController.createReview);

router.get("/:reviewId", reviewController.getReviewById);

router.put("/:reviewId", reviewController.updateReview);

router.delete("/:reviewId", reviewController.deleteReview);

module.exports = router;