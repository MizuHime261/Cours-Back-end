const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controllers");
const { authenticate, authorize } = require("../middlewares/auth.middlewares");
const multer = require("multer");

// Middleware xác thực
router.get("/", authenticate, authorize(["Admin"]), userController.getAll);
router.get("/:id", authenticate, authorize(["Admin", "User"]), userController.getOne);

// Cấu hình upload file (single)
const singleStorage = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, `${__dirname}/../public/`);
	},
	filename: function (req, file, cb) {
	  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
	  let extension = file.originalname.split(".").pop();
	  let fileName = `${file.fieldname}-${uniqueSuffix}.${extension}`;
	  cb(null, fileName);
	}
});

// Cấu hình upload file (multiple)
const multiStorage = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, `${__dirname}/../public`);
	},
	filename: function (req, file, cb) {
	  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
	  let extension = file.originalname.split(".").pop();
	  let fileName = `${file.fieldname}-${uniqueSuffix}.${extension}`;
	  cb(null, fileName);
	}
});

const uploadSingle = multer({ storage: singleStorage });
const uploadMultiple = multer({ storage: multiStorage });

// Routes
router.post("/", uploadSingle.array("avatar"), userController.createOne);
router.put("/:id", userController.updateOne);
router.delete("/:id", userController.deleteOne);

module.exports = router;
