const express = require("express");
const {
  createCourse,
  getCourses,
  getHomeCourses,
  getCourseById,
  getAllCoursesAdmin,
  updateCourse
} = require("../controllers/courseController");
const { protect, adminOnly } = require("../middlewares/authMiddleware");

const router = express.Router();

// Admin only
router.post("/", protect, adminOnly, createCourse);

// Public / logged-in users
router.get("/", getCourses);

router.get("/:id", protect, adminOnly, getCourseById);

// Home page
router.get("/home", getHomeCourses);

router.get("/admin", protect, adminOnly, getAllCoursesAdmin);
router.put("/:id", protect, adminOnly, updateCourse);

module.exports = router;