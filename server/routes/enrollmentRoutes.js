const express = require("express");
const { getMyEnrollments } = require("../controllers/enrollmentController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/my", protect, getMyEnrollments);

module.exports = router;