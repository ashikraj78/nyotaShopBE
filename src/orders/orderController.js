const formDataServices = require("../formData/formDataServices");
const userServices = require("../users/userServices");
const orderServices = require("./orderServices");

let orderController = {
  createOrder: async function (req, res) {
    const {
      userId,
      productId,
      formDataId,
      razorPayPaymentId,
      paidAmount,
      orderStatus,
    } = req.body;
    const orderInput = {
      userId: userId,
      productId: productId,
      formDataId: formDataId,
      razorPayPaymentId: razorPayPaymentId,
      paidAmount: paidAmount,
      orderStatus: orderStatus,
    };
    if (
      !userId ||
      !productId ||
      !formDataId ||
      !razorPayPaymentId ||
      !paidAmount
    ) {
      return res.status(400).json({
        msg: "userId, productId, formDataId, razorPayPaymentId is required",
      });
    }
    try {
      const order = await orderServices.createOrder(orderInput);
      let orderId = order._id;
      const updateUser = await userServices.updateUser(userId, {
        $push: { myOrders: orderId },
      });
      const updateFormData = await formDataServices.updateFormData(formDataId, {
        $push: { orderId: orderId },
      });
      return res.json({ order: order });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Failed to create order" });
    }
  },
};
module.exports = orderController;
