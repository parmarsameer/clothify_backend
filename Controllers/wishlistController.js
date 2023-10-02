const Wishlist = require("../models/wishlist");

const addToWishlist = async (req, res) => {
  try {
    const {
      sellerId,
      productId,
      userId,
      brandName,
      productName,
      price,
      productImage,
      isStock,
    } = req.body;

    const wishlist = new Wishlist({
      sellerId,
      productId,
      userId,
      brandName,
      productName,
      price,
      productImage,
      isStock,
    });
    const alreadyExist = await Wishlist.find({
      userId: { $eq: userId },
      productId: { $eq: productId },
    });
    console.log(alreadyExist);
    if (!alreadyExist.length) {
      const query = await wishlist.save();

      res.status(200).json({
        success: true,
        message: "add to wishlist successfully!",
        data: query,
      });
    } else {
      res.status(200).json({
        message: "Product is already wishlisted!",
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

const getAllWishlistProduct = async (req, res) => {
  try {
    const query = await Wishlist.find();
    res.status(200).json({ data: query });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const getWishlistProduct = async (req, res) => {
  try {
    const query = await Wishlist.findById({ _id: req.params.id });
    if (query) {
      res.status(200).send({
        data: query,
        success: true,
      });
    } else {
      res.status(400).json({
        message: "No product is found by this id",
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

const getAllWishlistProductByUser = async (req, res) => {
  try {
    const query = await Wishlist.find({ userId: { $eq: req.params.id } });
    if (query.length) {
      res.status(200).json({ success: true, data: query });
    } else {
      res.status(200).json({ success: false, message: "No product found" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const getAlreadyWishlistedProduct = async (req, res) => {
  try {
    const query = await Wishlist.find({
      userId: { $eq: req.body.userId },
      productId: { $eq: req.body.productId },
    });
    // console.log(req.body);
    // console.log(query);
    if (query.length) {
      res.status(200).json({ wishlisted: true });
    } else {
      res.status(200).json({ wishlisted: false });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const deleteWishlistProduct = async (req, res) => {
  try {
    const findProduct = await Wishlist.findById(req.params.id);
    if (findProduct) {
      const query = await Product.findByIdAndDelete(req.params.id);
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

module.exports = {
  addToWishlist,
  getAllWishlistProduct,
  getWishlistProduct,
  getAllWishlistProductByUser,
  getAlreadyWishlistedProduct,
  deleteWishlistProduct,
};
