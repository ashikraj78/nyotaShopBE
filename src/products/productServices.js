const Product = require("../../models/Product");

let productServices = {
  createProduct: async function (product) {
    try {
      return await Product.create(product);
    } catch (error) {
      return error;
    }
  },
  showProduct: async function (productId) {
    try {
      return await Product.findById(productId);
    } catch (error) {
      return error;
    }
  },
};

module.exports = productServices;
