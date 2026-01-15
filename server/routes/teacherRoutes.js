const express = require("express");
const router = express.Router();
const {
  createTeacher,
  getTeachers,
  getTeacherById,
  updateTeacher,
} = require("../controllers/teacherController");

const { protect, adminOnly } = require("../middlewares/authMiddleware");


// Public / Admin
router.get("/", getTeachers);
// Admin only
router.post("/", protect, adminOnly, createTeacher);

router.get("/:id", getTeacherById);
router.patch("/admin/:id/teacher", protect, adminOnly, updateTeacher);

module.exports = router;
