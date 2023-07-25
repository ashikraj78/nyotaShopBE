var express = require("express");
const userController = require("../src/users/userController");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// create user
router.post("/createUser", userController.createUser);
router.post("/generateOTP", userController.generateOTP);
router.post("/loginUser", userController.loginUser);

module.exports = router;
