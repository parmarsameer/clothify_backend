const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    brandName: {
      type: String,
      required: true,
    },
    sellerId: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    size: {
      type: Array,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    productImage: {
      type: String,
      required: true,
    },
    isStock: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Product = mongoose.model("Product", productSchema);
