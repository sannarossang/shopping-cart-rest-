const ShoppingCart = require("../models/ShoppingCart");
const Product = require("../models/Product");

exports.getAllShoppingCarts = async (req, res) => {
  try {
    const shoppingCarts = await ShoppingCart.find();
    if (!shoppingCarts) {
      return res.status(500).json({ message: "Internal error" });
    }
    if (shoppingCarts <= 0) {
      return res.status(404).json({ message: "No carts to return found" });
    }
    return res.json({
      data: shoppingCarts,
      meta: {
        count: shoppingCarts.length,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal error" });
  }
};

exports.getShoppingCartById = async (req, res) => {
  try {
    const shoppingCartId = req.params.shoppingCartId;
    if (shoppingCartId.length != 24) {
      return res.status(400).json({ message: "Cart id is invalid" });
    }
    const shoppingCart = await ShoppingCart.findById(shoppingCartId);
    if (!shoppingCart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    return res.json(shoppingCart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal error" });
  }
};

exports.createNewShoppingCart = async (req, res) => {
  try {
    const newShoppingCart = await ShoppingCart.create({});
    if (!newShoppingCart) {
      return response.status(500).json({ message: "Internal error" });
    }
    return res
      .setHeader(
        "Location",
        `http://localhost:${process.env.PORT}/api/v1/shoppingCarts/${newShoppingCart._id}`
      )
      .status(201)
      .json(newShoppingCart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal error" });
  }
};

exports.updateShoppingCartById = async (req, res) => {
  try {
    const { productId } = req.body;
    if (productId.length != 24) {
      return res.status(400).json({ message: "Product id is invalid" });
    }
    const quantity = Number.parseInt(req.body.quantity);
    const shoppingCartId = req.params.shoppingCartId;
    if (!productId || !quantity) {
      return res.status(400).json({
        message: "You must provide a correct productId and quantity to update.",
      });
    }
    const shoppingCartToUpdate = await ShoppingCart.findById(shoppingCartId);
    if (!shoppingCartToUpdate) {
      return res.status(404).json({
        message: "Shopping cart not found",
      });
    }
    const productToUpdate = await Product.findById(productId);
    if (!productToUpdate) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    const foundProductInCart = shoppingCartToUpdate.shoppingCartItems.find(
      ({ product }) => product == productId
    );
    if (foundProductInCart !== undefined) {
      foundProductInCart.quantity = foundProductInCart.quantity + quantity;
      shoppingCartToUpdate.totalPrice =
        shoppingCartToUpdate.totalPrice + productToUpdate.unitPrice * quantity;
    } else {
      const newShoppingCartItem = {
        product: productId,
        quantity: quantity,
      };
      shoppingCartToUpdate.totalPrice =
        shoppingCartToUpdate.totalPrice +
        productToUpdate.unitPrice * newShoppingCartItem.quantity;
      shoppingCartToUpdate.shoppingCartItems.push(newShoppingCartItem);
    }
    const updatedShoppingCart = await shoppingCartToUpdate.save();
    return res.json(updatedShoppingCart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal error" });
  }
};

exports.deleteShoppingCartById = async (req, res) => {
  const shoppingCartId = req.params.shoppingCartId;
  if (!shoppingCartId || shoppingCartId.length != 24) {
    return res.status(400).json({ message: "ShoppingCart id is invalid" });
  }
  try {
    const shoppingCartToDelete = await ShoppingCart.findById(shoppingCartId);
    if (!shoppingCartToDelete) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }
    await shoppingCartToDelete.delete();
    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal error" });
  }
};

exports.deleteShoppingCartItemById = async (req, res) => {
  const shoppingCartId = req.params.shoppingCartId;
  const productId = req.params.shoppingCartItemId;

  if (shoppingCartId.length != 24) {
    return res.status(400).json({ message: "Cart id is invalid" });
  }

  try {
    let shoppingCartToUpdate = await ShoppingCart.findById(shoppingCartId);
    if (!shoppingCartToUpdate) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const productInCart = shoppingCartToUpdate.shoppingCartItems.find(
      ({ product }) => product == productId
    );
    if (!productInCart) {
      return res.status(404).json({
        message: "Product in cart not found",
      });
    }

    const productToUpdate = await Product.findById(productId);
    if (!productToUpdate) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    shoppingCartToUpdate.totalPrice =
      shoppingCartToUpdate.totalPrice -
      productToUpdate.unitPrice * productInCart.quantity;

    let index = shoppingCartToUpdate.shoppingCartItems.indexOf(productInCart);
    shoppingCartToUpdate.shoppingCartItems.splice(index, 1);

    const updatedShoppingCart = await shoppingCartToUpdate.save();

    return res.json(updatedShoppingCart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal error" });
  }
};
