const formDataServices = require("./formDataServices");
let formDataController = {
  createFormData: async function (req, res) {
    const { userId, productId, brideData, groomData, eventsData, images } =
      req.body;
    const formDataInput = {
      userId: userId,
      productId: productId,
      brideData: brideData,
      groomData: groomData,
      eventsData: eventsData,
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
};

module.exports = formDataController;
