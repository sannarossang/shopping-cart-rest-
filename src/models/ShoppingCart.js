const mongoose = require("mongoose");

const ShoppingCartSchema = new mongoose.Schema(
  {
    shoppingCartItems: {
      type: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
          },
          quantity: {
            type: Number,
            requried: true,
            min: [1, "Quantity can not be less than 1"],
          },
        },
      ],
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ShoppingCart", ShoppingCartSchema);
