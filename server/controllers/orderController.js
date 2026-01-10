const Order = require("../models/Order");
const razorpay = require("../config/razorpay");

exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0)
      return res.status(400).json({ message: "Invalid amount" });

    // 1. Create order in DB
    const order = await Order.create({
      user: req.user.id,
      amount
    });

    // 2. Create order in Razorpay
    const razorpayOrder = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: order._id.toString()
    });

    // 3. Save Razorpay order ID
    order.razorpayOrderId = razorpayOrder.id;
    await order.save();

    res.status(201).json({
      orderId: order._id,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Order creation failed" });
  }
};