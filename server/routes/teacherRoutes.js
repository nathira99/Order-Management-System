const express = require("express");
const router = express.Router();
const {
  createTeacher,
  getTeachers,
  getTeacherById,
  updateTeacher,
} = require("../controllers/teacherController");

const { protect, admin } = require("../middlewares/authMiddleware");

// Admin only
router.post("/", createTeacher);
router.put("/:id", updateTeacher);

// Public / Admin
router.get("/", getTeachers);
router.get("/:id", getTeacherById);

module.exports = router;