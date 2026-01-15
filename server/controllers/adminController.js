const Order = require("../models/Order");
const Payment = require("../models/Payment");

// exports.getAllPayments = async (req, res) => {
//   const orders = await Order.find({ status: "PAID" })
//     .populate("user")
//     .populate("course")
//     .sort({ createdAt: -1 });

//   res.json(orders);
// };

exports.getRevenueStats = async (req, res) => {
  const orders = await Order.find({ status: "PAID" });

  const totalRevenue = orders.reduce(
    (sum, o) => sum + o.amount,
    0
  );

  res.json({
    totalRevenue,
    totalPayments: orders.length
  });
};

exports.getAllPayments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      Order.find({ status: "PAID" })
        .populate("user", "email")
        .populate("course", "title")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),

      Order.countDocuments({ status: "PAID" })
    ]);

    res.json({
      payments: orders,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("ADMIN PAYMENTS ERROR:", err);
    res.status(500).json({ message: "Failed to load payments" });
  }
};