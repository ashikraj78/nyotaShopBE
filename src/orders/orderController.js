const orderServices = require("./orderServices");

let orderController = {
  createOrder: async function (req, res) {
    const { userId, videoId } = req.body;
    const orderInput = {
      userId: userId,
      videoId: videoId,
    };
    if (!userId || !videoId) {
      return res.status(400).json({ msg: "userId and video id is required" });
    }
    try {
      const order = await orderServices.createOrder(orderInput);
      return res.json({ order: order });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Failed to create order" });
    }
  },
};
module.exports = orderController;
