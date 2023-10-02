const express = require("express");
const {
  addToCart,
  getCartProductsByUser,
  removeProductFromCart,
  updateCartProduct,
} = require("../Controllers/cartController");
const router = express.Router();

router.post("/add", addToCart);
router.get("/user/:id", getCartProductsByUser);
router.delete("/:id", removeProductFromCart);
router.patch("/:id", updateCartProduct);

module.exports = router;
