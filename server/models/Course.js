const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number, // store in paise
      required: true
    },
    category: {
      type: String,
      enum: ["Academic", "Islamic", "Skills"],
      required: true
    },
    image: {
      type: String,
    },
    duration: {
      type: Number
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema, "courses");