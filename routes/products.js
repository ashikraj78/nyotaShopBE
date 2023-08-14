const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const productController = require("../src/products/productController");
const router = express.Router();

// create Product
router.get("/showProduct", productController.showProduct);

router.use(authMiddleware.identifyUser);

router.post("/createProduct", productController.createProduct);
router.put("/updateProduct", productController.updateProduct);
module.exports = router;
