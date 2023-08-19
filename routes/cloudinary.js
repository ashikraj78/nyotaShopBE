const express = require("express");
const cloudinaryController = require("../src/cloudinary/cloudinaryController");
const router = express.Router();

// delete Cloudinary Image
router.post("/deleteImage", cloudinaryController.deleteImage);

module.exports = router;
