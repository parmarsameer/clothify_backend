const express = require("express");
const {
  addToWishlist,
  getWishlistProduct,
  getAllWishlistProduct,
  getAllWishlistProductByUser,
  getAlreadyWishlistedProduct,
  deleteWishlistProduct,
} = require("../Controllers/wishlistController");
const router = express.Router();

router.get("/", getAllWishlistProduct);
router.get("/:id", getWishlistProduct);
router.get("/user/:id", getAllWishlistProductByUser);
router.post("/add", addToWishlist);
router.post("/is-wishlisted", getAlreadyWishlistedProduct);
router.delete("/:id", deleteWishlistProduct);

module.exports = router;
