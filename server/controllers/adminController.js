const Payment = require("../models/Payment");

exports.getAllPayments = async (req, res) => {
  const payments = await Payment.find()
    .populate("order")
    .sort({ createdAt: -1 });

  res.json(payments);
};

exports.getRevenueStats = async (req, res) => {
  const payments = await Payment.find({ status: "SUCCESS" })
    .populate("order");

  const totalRevenue = payments.reduce(
    (sum, p) => sum + p.order.amount,
    0
  );

  res.json({
    totalRevenue,           // in paise
    totalPayments: payments.length
  });
};