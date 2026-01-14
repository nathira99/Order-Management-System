const Enrollment = require("../models/Enrollment");

exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // signature verification logic (already correct)

    const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // 🔒 CHECK IF ALREADY ENROLLED
    const alreadyEnrolled = await Enrollment.findOne({
      user: order.user,
      course: order.course,
    });

    if (alreadyEnrolled) {
      return res.status(400).json({
        message: "You are already enrolled in this course",
      });
    }

    // mark order paid
    order.status = "PAID";
    await order.save();

    // create enrollment
    await Enrollment.create({
      user: order.user,
      course: order.course,
    });

    res.json({ message: "Payment verified & enrolled successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Payment verification failed" });
  }
};