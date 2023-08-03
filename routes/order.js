const express = require("express");
const orderController = require("../src/orders/orderController");
const router = express.Router();

// create order
router.post("/createOrder", orderController.createOrder);
router.get("/listOrder", orderController.listOrder);
router.get("/showOrder", orderController.showOrder);
router.put("/updateOrder", orderController.updateOrder);

module.exports = router;
