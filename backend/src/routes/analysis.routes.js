const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

const {
    createAnalysis,
    getHistory,
    getAnalysisById,
} = require("../controllers/analysis.controller");


router.post(
  "/",
  authMiddleware,
  upload.single("document"),
  createAnalysis
);

router.get(
    "/history",
    authMiddleware,
    getHistory
);

router.get(
  "/:id",
  authMiddleware,
  getAnalysisById
);

module.exports = router;