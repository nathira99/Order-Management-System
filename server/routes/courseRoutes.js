const express = require("express");
const {
  createCourse,
  getCourses
} = require("../controllers/courseController");
const { protect, adminOnly } = require("../middlewares/authMiddleware");

const router = express.Router();

// Admin only
router.post("/", protect, adminOnly, createCourse);

// Public / logged-in users
router.get("/", getCourses);

module.exports = router;