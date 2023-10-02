require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.createSecretToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRETKEY, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};
