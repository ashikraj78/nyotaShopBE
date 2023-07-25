const express = require("express");
const orderController = require("../src/orders/orderController");
const router = express.Router();

// create order
router.post("/createOrder", orderController.createOrder);

module.exports = router;
