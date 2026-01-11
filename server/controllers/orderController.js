const Order = require("../models/Order");
const Course = require("../models/Course");
const razorpay = require("../config/razorpay");

exports.createOrder = async (req, res) => {
  try {
    const { amount, courseId } = req.body;

    if (!amount || !courseId) {
      return res.status(400).json({ message: "Amount and course ID required" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(400).json({ message: "Invalid course" });
    }

    const razorpayOrder = await razorpay.orders.create({
      amount,
      currency: "INR"
    });

    if (!razorpayOrder || !razorpayOrder.id) {
      throw new Error("Razorpay order creation failed");
    }

    await Order.create({
      user: req.user.id,   // ✅ FIXED
      course: course._id,
      amount,
      razorpayOrderId: razorpayOrder.id
    });

    res.status(201).json({
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: process.env.RAZORPAY_KEY_ID
    });

  } catch (error) {
    console.error("ORDER ERROR:", error);
    res.status(500).json({ message: "Order creation failed" });
  }
};