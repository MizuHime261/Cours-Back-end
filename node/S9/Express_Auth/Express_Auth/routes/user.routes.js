const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controllers");
const { authenticate, authorize } = require("../middlewares/auth.middlewares");

// authorization - phân quyền

// chỉ dành cho admin
router.get("/", authenticate, authorize(["ADMIN"]), userController.getAll);

// dành cho cả admin và user
router.get(
  "/:id",
  authenticate,
  authorize(["ADMIN", "USER"]),
  userController.getOne
);

router.post("/", userController.createOne);

router.put("/:id", userController.updateOne);

router.delete("/:id", userController.deleteOne);

module.exports = router;
