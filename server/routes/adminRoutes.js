const express = require("express");
const {
  getAllPayments,
  getRevenueStats
} = require("../controllers/adminController");
const { protect, adminOnly } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/payments", protect, adminOnly, getAllPayments);
router.get("/stats", protect, adminOnly, getRevenueStats);

module.exports = router;