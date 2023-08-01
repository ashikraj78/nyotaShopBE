const express = require("express");
const productController = require("../src/products/productController");
const router = express.Router();

// create Product

router.post("/createProduct", productController.createProduct);
router.get("/showProduct", productController.showProduct);
module.exports = router;
