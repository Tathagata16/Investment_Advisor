const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

const {
  createAnalysis,
} = require("../controllers/analysis.controller");

router.post(
  "/",
  authMiddleware,
  upload.single("document"),
  createAnalysis
);

module.exports = router;