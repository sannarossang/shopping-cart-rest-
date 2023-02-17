const express = require("express");
const router = express.Router();

const {
  getAllShoppingCarts,
  getShoppingCartById,
  createNewShoppingCart,
  updateShoppingCartById,
  deleteShoppingCartById,
} = require("../controllers/shoppingCartController");

router.get("/", getAllShoppingCarts);

router.get("/:shoppingCartId", getShoppingCartById);

router.post("/", createNewShoppingCart);

router.put("/:shoppingCartId", updateShoppingCartById);

router.delete("/:shoppingCartId", deleteShoppingCartById);

router.delete("/:shoppingCartId/:shoppingCartItemId", deleteShoppingCartById);

module.exports = router;
