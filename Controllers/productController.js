const Product = require("../models/product");
const Seller = require("../models/seller");
const addProduct = async (req, res) => {
  try {
    const {
      sellerId,
      brandName,
      productName,
      description,
      category,
      gender,
      size,
      price,
      productImage,
    } = req.body.product;
    const isSeller = await Seller.findById(sellerId);
    if (isSeller) {
      const product = new Product({
        sellerId,
        brandName,
        productName,
        description,
        category,
        gender,
        size,
        price,
        productImage,
      });

      const query = await product.save();

      res.status(200).json({
        success: true,
        message: "Product added successfully!",
        data: query,
      });
    } else {
      res.status(400).json({ message: "Cannot find seller" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const getProduct = async (req, res) => {
  try {
    const query = await Product.findById({ _id: req.params.id });
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

const getAllProduct = async (req, res) => {
  try {
    const query = await Product.find();
    res.status(200).json({ data: query });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const getAllProductBySeller = async (req, res) => {
  try {
    const query = await Product.find({ sellerId: { $eq: req.params.id } });
    res.status(200).json({ data: query });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    console.log(req.body);
    const findProduct = await Product.findById(req.params.id);
    if (findProduct) {
      const query = await Product.findByIdAndUpdate(req.params.id, req.body, {
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

const deleteProduct = async (req, res) => {
  try {
    const findProduct = await Product.findById(req.params.id);
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
  addProduct,
  getProduct,
  getAllProduct,
  getAllProductBySeller,
  updateProduct,
  deleteProduct,
};
