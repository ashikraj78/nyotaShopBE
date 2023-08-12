const userServices = require("../users/userServices");
const productServices = require("./productServices");
let productController = {
  createProduct: async function (req, res) {
    // create the product
    // title, subTitle, description, category, cost, timeDuration, videoLink, videoTheme, musicTheme, photosRequired, creatorId
    const {
      title,
      subTitle,
      description,
      category,
      cost,
      timeDuration,
      videoLink,
      videoTheme,
      musicTheme,
      photosRequired,
      creatorId,
    } = req.body;
    if (
      !title ||
      !subTitle ||
      !description ||
      !category ||
      !cost ||
      !timeDuration ||
      !videoLink ||
      !videoTheme ||
      !musicTheme ||
      !photosRequired ||
      !creatorId
    ) {
      return res.status(400).json({
        msg: "title, subTitle, description, category, cost, timeDuration, videoLink, videoTheme, musicTheme, photosRequired, creatorId are required field",
      });
    }
    const productInputData = {
      title,
      subTitle,
      description,
      category,
      cost,
      timeDuration,
      videoLink,
      videoTheme,
      musicTheme,
      photosRequired,
      creatorId,
    };
    try {
      const product = await productServices.createProduct(productInputData);
      let productId = product._id;
      let userId = product.creatorId;
      const updateUser = await userServices.updateUser(userId, {
        $push: { myProducts: productId },
      });
      return res.json({ product: product });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Failed to create product" });
    }
  },
  updateProduct: async function (req, res, next) {
    const productId = req.query.id;
    const {
      title,
      subTitle,
      description,
      category,
      cost,
      timeDuration,
      videoLink,
      videoTheme,
      musicTheme,
      photosRequired,
      creatorId,
    } = req.body;
    if (
      !title ||
      !subTitle ||
      !description ||
      !category ||
      !cost ||
      !timeDuration ||
      !videoLink ||
      !videoTheme ||
      !musicTheme ||
      !photosRequired ||
      !creatorId
    ) {
      return res.status(400).json({
        msg: "title, subTitle, description, category, cost, timeDuration, videoLink, videoTheme, musicTheme, photosRequired, creatorId are required field",
      });
    }
    const productInputData = {
      title,
      subTitle,
      description,
      category,
      cost,
      timeDuration,
      videoLink,
      videoTheme,
      musicTheme,
      photosRequired,
      creatorId,
    };
    try {
      const updatedProduct = await productServices.updateProduct(
        productId,
        productInputData
      );
      return res.json(updatedProduct);
    } catch (error) {
      next(error);
    }
  },

  showProduct: async function (req, res) {
    const productId = req.query.id;
    try {
      const product = await productServices.showProduct(productId);
      return res.json(product);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Failed to fetch product" });
    }
  },
};

module.exports = productController;
