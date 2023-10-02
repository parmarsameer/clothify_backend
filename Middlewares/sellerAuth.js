const Seller = require("../models/seller");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.sellerVerification = async (req, res) => {
  const token = req.cookies.token;
  // console.log(req.cookies);
  if (!token) {
    return res.json({ message: "No token found", success: false });
  }
  jwt.verify(token, process.env.JWT_SECRETKEY, async (err, data) => {
    if (err) {
      // console.log(err);
      return res.json({ error: err, success: false });
    } else {
      // console.log(data);
      const seller = await Seller.findById(data.id);
      if (seller) return res.json({ success: true, seller });
      else return res.json({ success: false });
    }
  });
};
