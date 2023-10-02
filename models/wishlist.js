const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const wishlistSchema = new Schema(
  {
    sellerId: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    brandName: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
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

module.exports = Product = mongoose.model("Wishlist", wishlistSchema);
