const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book.controller");
const bookMiddleware = require("../middlewares/book.middleware");

router.get("/", bookMiddleware.validateBook, bookController.getBooks);

router.get("/:id", bookMiddleware.validateBookId, bookController.getBookById);

router.get("/:id/reviews", bookMiddleware.validateBookId, bookController.getBookReviews);

router.post("/", bookMiddleware.validateCreateBook, bookController.createBook);

router.post("/:id/reviews", bookMiddleware.validateBookId, bookMiddleware.validateReview, bookController.addReview);

router.put("/:id", bookMiddleware.validateBookId, bookMiddleware.validateUpdateBook, bookController.updateBook);

router.delete("/:id", bookMiddleware.validateBookId, bookController.deleteBook);

module.exports = router;