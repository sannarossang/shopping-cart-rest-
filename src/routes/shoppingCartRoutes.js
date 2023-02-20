const express = require("express");
const router = express.Router();

const {
  getAllShoppingCarts,
  getShoppingCartById,
  createNewShoppingCart,
  updateShoppingCartById,
  deleteShoppingCartById,
  deleteShoppingCartItemByProductId,
} = require("../controllers/shoppingCartController");

router.get("/", getAllShoppingCarts);

router.get("/:shoppingCartId", getShoppingCartById);

router.post("/", createNewShoppingCart);

router.put("/:shoppingCartId", updateShoppingCartById);

router.delete("/:shoppingCartId", deleteShoppingCartById);

router.delete("/:shoppingCartId/:productId", deleteShoppingCartItemByProductId);

module.exports = router;
