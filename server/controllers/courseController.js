const Course = require("../models/Course");
const Teacher = require("../models/Teachers");

// Admin: add course
exports.createCourse = async (req, res) => {
  const { title, description, price, category, isActive, duration, image } = req.body;

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
    const course = await Course.findById(req.params.id);

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
    .select("title description category");

  res.json(courses);
};

exports.getAllCoursesAdmin = async (req, res) => {
  try{
    const courses = await Course.find().sort({ createdAt: -1 });
  res.json(courses);
} catch (err) {
  console.error("Admin get all courses error", err);
  res.status(500).json({ message: "Failed to fetch course" });
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