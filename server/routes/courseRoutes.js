const express = require("express");
const {
  createCourse,
  getCourses,
  getHomeCourses,
  getCourseById,
  getAdminCourses,
  toggleCourseStatus,
  updateCourse,
  updateCourseTeacher,
} = require("../controllers/courseController");
const { protect, adminOnly } = require("../middlewares/authMiddleware");

const router = express.Router();

// Admin only
router.get("/admin", protect, adminOnly, getAdminCourses);
router.patch("/admin/:id/teacher", protect, adminOnly, updateCourseTeacher);
router.patch("/admin/:id/toggle", protect, adminOnly, toggleCourseStatus);

// Public / logged-in users
router.get("/home", getHomeCourses);
router.get("/", getCourses);

router.get("/:id", protect, getCourseById);

router.post("/", protect, adminOnly, createCourse);
router.put("/:id", protect, adminOnly, updateCourse);

module.exports = router;
