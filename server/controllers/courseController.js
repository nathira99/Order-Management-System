const Course = require("../models/Course");
const Teacher = require("../models/Teacher");
const Enrollment = require("../models/Enrollment")

// Admin: add course
exports.createCourse = async (req, res) => {
  const { title, description, price, category, isActive, duration, image, teacher } = req.body;

  if (!title || !description || !price || !category) {
    return res.status(400).json({ message: "All fields required" });
  }

  const course = await Course.create({
    title,
    description,
    price,
    category,
    isActive,
    teacher,
    duration,
    image
  });

  res.status(201).json(course);
};

// Public/User: get courses
exports.getCourses = async (req, res) => {
  const courses = await Course.find({ isActive: true });
  res.json(courses);
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).where({ isActive: true });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch course" });
  }
};

exports.getHomeCourses = async (req, res) => {
  const courses = await Course.find({ isActive: true })
    .sort({ createdAt: -1 })
    .limit(3)
    .select("title description category image");

  res.json(courses);
};

exports.getAdminCourses = async (req, res) => {
  try {
      console.log("GetAdminCourses HIT");

    const courses = await Course.find().lean();

    console.log("Course Count: ", courses.length);
    const courseIds = courses.map(c => c._id);

    const enrollments = await Enrollment.aggregate([
      { $match: { course: { $in: courseIds } } },
      { $group: { _id: "$course", count: { $sum: 1 } } }
    ]);

    const countMap = {};
    enrollments.forEach(e => {
      countMap[e._id.toString()] = e.count;
    });

    const result = courses.map(c => ({
      ...c,
      enrolledCount: countMap[c._id.toString()] || 0
    }));

    res.json(courses);
  } catch (err) {
    console.error("ADMIN COURSES ERROR:", err);
    res.status(500).json({ message: "Failed to load admin courses" });
  }
};

// controllers/courseController.js
exports.toggleCourseStatus = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    course.isActive = !course.isActive;
    await course.save();

    res.json({
      message: "Status updated",
      isActive: course.isActive
    });
  } catch (err) {
    console.error("TOGGLE ERROR:", err);
    res.status(500).json({ message: "Failed to toggle status" });
  }
};

exports.updateCourse = async (req, res) => {
  const course = await Course.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(course);
};

exports.updateCourseTeacher = async (req, res) => {
  try {
    const { teacherId } = req.body;

    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    course.teacher = teacherId || null;
    await course.save();

    const updated = await course.populate("teacher", "name email");

    console.log("Updated Course:", updated);
    console.log("Params:", req.params);
        console.log("body:", req.body);

    res.json(updated);
  } catch (err) {
    console.error("UPDATE COURSE TEACHER ERROR:", err);
    res.status(500).json({ message: "Failed to assign teacher" });
  }
};

exports.getCourseStats = async (req, res) => {
  try {
    const totalCourses = await Course.countDocuments();
    const activeCourses = await Course.countDocuments({ isActive: true });
    const inactiveCourses = await Course.countDocuments({ isActive: false });

    res.json({
      totalCourses,
      activeCourses,
      inactiveCourses
    });
  } catch (err) {
    console.error("COURSE STATS ERROR:", err);
    res.status(500).json({ message: "Failed to load course stats" });
  }
};