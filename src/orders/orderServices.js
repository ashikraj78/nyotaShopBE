const Order = require("../../models/Order");

let orderServices = {
  createOrder: async function (order) {
    try {
      return await Order.create(order);
    } catch (error) {
      return error;
    }
  },
  listOrder: async function () {
    try {
      return await Order.find({})
        .populate("userId", "name")
        .sort({ createdAt: "desc" });
    } catch (error) {
      return error;
    }
  },
  showOrder: async function (orderId) {
    try {
      return await Order.findById(orderId);
    } catch (error) {
      return error;
    }
  },
  updateOrder: async function (orderId, orderInfo) {
    try {
      return await Order.findByIdAndUpdate(orderId, orderInfo, {
        new: true,
      });
    } catch (error) {
      return error;
    }
  },
  deleteOrder: async function (orderId) {
    try {
      return await Order.findByIdAndDelete(orderId);
    } catch (error) {
      return error;
    }
  },
};

module.exports = orderServices;
