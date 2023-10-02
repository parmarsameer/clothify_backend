const express = require("express");
const {
  sellerRegistration,
  sellerLogIn,
  getSeller,
  getAllSeller,
} = require("../Controllers/sellerController");
const { sellerVerification } = require("../Middlewares/sellerAuth");
const router = express.Router();

router.get("/", getAllSeller);
router.get("/:id", getSeller);
router.post("/register", sellerRegistration);
router.post("/login", sellerLogIn);
router.post("/verify", sellerVerification);

module.exports = router;
