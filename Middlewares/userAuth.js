const User = require("../models/user");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res) => {
  const token = req.cookies.token;
  // console.log(token);
  if (!token) {
    return res.json({ message: "No token found", success: false });
  }
  jwt.verify(token, process.env.JWT_SECRETKEY, async (err, data) => {
    if (err) {
      return res.json({ error: err, success: false });
    } else {
      // console.log(data);
      const user = await User.findById(data.id);
      if (user) return res.json({ success: true, user });
      else return res.json({ success: false });
    }
  });
};
