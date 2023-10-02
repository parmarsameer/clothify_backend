const express = require("express");
const {
  userRegistration,
  userLogin,
  getUser,
  getAllUser,
  saveUserAddr,
} = require("../Controllers/userController");
const { userVerification } = require("../Middlewares/userAuth");
const router = express.Router();

router.get("/", getAllUser);
router.get("/:id", getUser);
router.post("/register", userRegistration);
router.post("/login", userLogin);
router.post("/verify", userVerification);
router.patch("/add-addr/:id", saveUserAddr);

module.exports = router;
