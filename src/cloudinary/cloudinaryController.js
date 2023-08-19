const cloudinary = require("cloudinary").v2;
let cloudinaryController = {
  deleteImage: async function (req, res) {
    try {
      const publicId = req.body.publicId;

      // delete the image form cloudinary

      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) {
          return res
            .status(500)
            .send({ success: false, message: "Deletion failed" });
        } else {
          return res.send({ success: true, message: "Image deleted", result });
        }
      });
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = cloudinaryController;
