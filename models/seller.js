const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const sellerSchema = new Schema({
  ownerName: {
    type: String,
    required: true,
  },
  brandName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a valid password"],
    minlength: [4, "minimum password length must be 4 characters"],
  },
  profilePicture: {
    type: String,
    required: true,
  },
});

sellerSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = Seller = mongoose.model("seller", sellerSchema);
