const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true
    },
    razorpayPaymentId: {
      type: String,
      required: true
    },
    razorpaySignature: {
      type: String,
      required: true
    },
    method: {
      type: String // upi, card, netbanking
    },
    status: {
      type: String,
      enum: ["SUCCESS", "FAILED"],
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema, "payments");