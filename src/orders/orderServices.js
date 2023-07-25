const Order = require("../../models/Order");

let orderServices = {
  createOrder: async function (order) {
    try {
      return await Order.create(order);
    } catch (error) {
      return error;
    }
  },
};

module.exports = orderServices;
