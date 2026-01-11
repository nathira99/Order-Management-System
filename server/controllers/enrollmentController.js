const Enrollment = require("../models/Enrollment");

exports.getMyEnrollments = async (req, res) => {
  const enrollments = await Enrollment
  .find({ user: req.user.id })
  .populate("course");
  res.json(enrollments);
};