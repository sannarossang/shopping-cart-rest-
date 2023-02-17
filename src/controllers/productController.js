const Product = require("../models/Product");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) {
      return res.status(500).json({ message: "Internal error" });
    }
    if (products <= 0) {
      return res.status(404).json({ message: "No products to return found" });
    }
    return res.json({
      data: products,
      meta: {
        count: products.length,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal error" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    if (productId.length != 24) {
      return res.status(400).json({ message: "Product id is invalid" });
    }
    const product = await Product.findById(productId);
    if (!productId) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal error" });
  }
};
