const Cart = require("../models/cart");
const Product = require("../models/product");

const addToCart = async (req, res) => {
  try {
    const { userId, productId, qty, size } = req.body;
    const alreadyExist = await Cart.findOne({ userId, productId, size });
    if (alreadyExist) {
      const addQty = await Cart.findByIdAndUpdate(
        alreadyExist._id,
        { qty: Number(alreadyExist.qty) + 1 },
        { new: true }
      );
      res.status(201).json({
        success: true,
        message: "Succesfully added to cart!",
        data: addQty,
      });
    } else {
      const product = await Product.findById(productId);
      const { brandName, productName, price, productImage } = product;
      const cart = new Cart({
        userId,
        productId,
        qty,
        size,
        brandName,
        productName,
        price,
        productImage,
      });
      const query = await cart.save();
      res.status(201).json({
        success: true,
        message: "Succesfully added to cart!",
        data: query,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

const getCartProductsByUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const query = await Cart.find({ userId: { $eq: userId } });
    // console.log(query);
    // console.log(typeof query);
    if (query.length > 0) {
      res.status(200).json({ success: true, data: query });
    } else {
      res.status(200).json({ success: false, message: "No product found!" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const removeProductFromCart = async (req, res) => {
  try {
    const findProduct = await Cart.findById(req.params.id);
    if (findProduct) {
      const query = await Cart.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Product deleted successfully" });
    } else {
      res.status(400).json({
        message: "Delete fail!, No product found with this id",
        success: false,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const updateCartProduct = async (req, res) => {
  try {
    // console.log(req.body);
    const findProduct = await Cart.findById(req.params.id);
    if (findProduct) {
      const query = await Cart.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json({ product: query });
    } else {
      res.status(400).json({
        message: "Update fail!, No product found with this id",
        success: false,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

module.exports = {
  addToCart,
  getCartProductsByUser,
  removeProductFromCart,
  updateCartProduct,
};
