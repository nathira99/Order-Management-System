const express = require("express");
const { verifyPayment } = require("../controllers/paymentController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/verify", protect, verifyPayment);

module.exports = router;