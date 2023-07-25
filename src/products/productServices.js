const Product = require("../../models/Product");

let productServices = {
  createProduct: async function (product) {
    try {
      return await Product.create(product);
    } catch (error) {
      return error;
    }
  },
};

module.exports = productServices;
