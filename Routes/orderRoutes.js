const express = require("express");
const { placeOrder } = require("../Controllers/orderController");

const router = express.Router();

router.post("/place", placeOrder);
// router.get("/user/:id", getCartProductsByUser);
// router.delete("/:id", removeProductFromCart);
// router.patch("/:id", updateCartProduct);

module.exports = router;
