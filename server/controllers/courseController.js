const Course = require("../models/Course");

// Admin: add course
exports.createCourse = async (req, res) => {
  const { title, description, price } = req.body;

  if (!title || !description || !price) {
    return res.status(400).json({ message: "All fields required" });
  }

  const course = await Course.create({
    title,
    description,
    price
  });

  res.status(201).json(course);
};

// Public/User: get courses
exports.getCourses = async (req, res) => {
  const courses = await Course.find({ isActive: true });
  res.json(courses);
};