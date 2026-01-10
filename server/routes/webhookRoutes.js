const express = require("express");
const { razorpayWebhook } = require("../controllers/webhookController");

const router = express.Router();

// RAW body required for webhook
router.post(
  "/razorpay",
  express.raw({ type: "application/json" }),
  razorpayWebhook
);

module.exports = router;