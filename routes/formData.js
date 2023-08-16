const express = require("express");
const router = express.Router();
const formDataController = require("../src/formData/formDataController");

// create formData
router.post("/createFormData", formDataController.createFormData);
router.put("/updateFormData", formDataController.updateFormData);

module.exports = router;
