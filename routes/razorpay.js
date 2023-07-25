const express = require("express");
const router = express.Router();
const razorpayController = require("../src/razorpay/razorpayController");

// create session
router.post("/createSession", razorpayController.createSession);
router.post("/verifyPayment", razorpayController.verifyPayment);

module.exports = router;
