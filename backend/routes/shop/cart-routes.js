const express = require("express");
const {
  addToCart,
  fetchCartItems,
  updateCartItemQuantity,
  deleteCartItem,
} = require("../../controllers/shop/cart-controller");

const router = express.Router();

router.post("/add", addToCart);
router.get("/get", fetchCartItems);
router.put("/update", updateCartItemQuantity);
router.delete("/:userId/:productId", deleteCartItem);

module.exports = router;
