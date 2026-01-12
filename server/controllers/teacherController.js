const Teacher = require("../models/Teachers");

exports.createTeacher = async (req, res) => {
  try {
    const { name, email, bio, image, isActive } = req.body;

    const exists = await Teacher.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Teacher already exists" });
    }

    const teacher = await Teacher.create({
      name,
      email,
      bio,
      image,
      isActive,
    });

    res.status(201).json(teacher);
  } catch (err) {
    res.status(500).json({ message: "Failed to create teacher" });
  }
};

exports.getTeachers = async (req, res) => {
  const teachers = await Teacher.find({ isActive: true }).sort({ name: 1 });
  res.json(teachers);
};

exports.getTeacherById = async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);
  if (!teacher) {
    return res.status(404).json({ message: "Teacher not found" });
  }
  res.json(teacher);
};

exports.updateTeacher = async (req, res) => {
  const teacher = await Teacher.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(teacher);
};