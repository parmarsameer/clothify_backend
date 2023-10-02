const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const subSchema = new Schema({
  productId: {
    type: String,
    required: true,
  },
  qty: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  subTotal: {
    type: Number,
    required: true,
  },
});

const orderSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    items: [subSchema],
    total: {
      type: Number,
      required: true,
    },
    shippingAddress: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Cart = mongoose.model("Order", orderSchema);
