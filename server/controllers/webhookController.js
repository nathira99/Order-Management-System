const crypto = require("crypto");
const Order = require("../models/Order");
const Payment = require("../models/Payment");

exports.razorpayWebhook = async (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

  const signature = req.headers["x-razorpay-signature"];
  const body = JSON.stringify(req.body);

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  if (signature !== expectedSignature) {
    return res.status(400).json({ message: "Invalid webhook signature" });
  }

  const event = req.body.event;

  if (event === "payment.captured") {
    const payment = req.body.payload.payment.entity;

    const order = await Order.findOne({
      razorpayOrderId: payment.order_id
    });

    if (order && order.status !== "PAID") {
      await Payment.create({
        order: order._id,
        razorpayPaymentId: payment.id,
        razorpaySignature: "webhook",
        method: payment.method,
        status: "SUCCESS"
      });

      order.status = "PAID";
      await order.save();
    }
  }

  res.json({ status: "ok" });
};