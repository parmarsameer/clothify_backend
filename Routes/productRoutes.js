const express = require("express");
const {
  addProduct,
  getProduct,
  getAllProduct,
  getAllProductBySeller,
  updateProduct,
  deleteProduct,
} = require("../Controllers/productController");
const router = express.Router();

router.get("/", getAllProduct);
router.get("/:id", getProduct);
router.get("/seller/:id", getAllProductBySeller);
router.post("/add-product", addProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
