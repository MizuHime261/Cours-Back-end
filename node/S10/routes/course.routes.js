const express = require("express");
const router = express.Router();
const jobController = require("../controllers/user.controller");

router.get("/", jobController.getAll);

router.get("/:id", jobController.getOne);

router.post("/", jobController.createOne);

router.put("/:id", jobController.updateOne);

router.delete("/:id", jobController.deleteOne);

module.exports = router;