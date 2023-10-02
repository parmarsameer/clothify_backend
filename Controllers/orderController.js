const Order = require("../models/order");
const User = require("../models/user");
const Cart = require("../models/cart");

const placeOrder = async (req, res) => {
  try {
    // console.log(req.body);
    const userId = "65193608e501b523340c88a4";
    const cart = ["651948415adc5300ea3eafa2", "651a58f03244e754c7843f2e"];
    // const { userId, cartId } = req.body;
    const findUser = await User.findById(userId);
    if (findUser) {
      const cart = await Cart.findById(cartId);
      res.status(200).json({ User: findUser, Cart: cart });
    } else {
      res.status(400).send("Cannot find user!");
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  placeOrder,
};
