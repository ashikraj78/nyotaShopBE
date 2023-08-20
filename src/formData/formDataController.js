const formDataServices = require("./formDataServices");
let formDataController = {
  createFormData: async function (req, res) {
    const {
      userId,
      productId,
      brideData,
      groomData,
      eventsData,
      images,
      specialNotes,
    } = req.body;
    const formDataInput = {
      userId: userId,
      productId: productId,
      brideData: brideData,
      groomData: groomData,
      eventsData: eventsData,
      specialNotes: specialNotes,
      images: images,
    };
    if (!userId || !productId || !brideData || !groomData || !eventsData) {
      return res.status(400).json({
        msg: "userId ,productId, brideData, groomData and eventsData  is required",
      });
    }
    try {
      const formData = await formDataServices.createFormData(formDataInput);
      return res.json(formData);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Failed to create formData" });
    }
  },
  updateFormData: async function (req, res, next) {
    let formDataId = req.query.id;
    const {
      userId,
      productId,
      brideData,
      groomData,
      eventsData,
      images,
      specialNotes,
    } = req.body;
    const updatedFormData = {
      userId: userId,
      productId: productId,
      brideData: brideData,
      groomData: groomData,
      eventsData: eventsData,
      specialNotes: specialNotes,
      images: images,
    };
    if (!userId || !productId || !brideData || !groomData || !eventsData) {
      return res.status(400).json({
        msg: "userId ,productId, brideData, groomData and eventsData  is required",
      });
    }
    try {
      const formData = await formDataServices.updateFormData(
        formDataId,
        updatedFormData
      );
      return res.json(formData);
    } catch (error) {
      next(error);
    }
  },
  updateImageFromData: async function (req, res, next) {
    let formDataId = req.query.id;
    const updatedImagesArray = req.body.images;
    let formDataDetails = await formDataServices.findFormData(formDataId);

    let updatedFormData = {
      ...formDataDetails._doc,
      images: updatedImagesArray,
    };

    const formData = await formDataServices.updateFormData(
      formDataId,
      updatedFormData
    );
    return res.json(formData);
  },
};

module.exports = formDataController;
