const User = require("../models/user");
const bcrypt = require("bcrypt");
const { createSecretToken } = require("../util/SecretToken");

const userRegistration = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    const emailExist = await User.findOne({ email });

    if (emailExist) {
      console.log(" Email is already exist");
      res.status(400).json({
        data: null,
        message: "Email is already exist",
        success: false,
      });
    }
    const newUser = new User({
      firstName,
      lastName,
      email,
      phone,
      password,
    });

    // bcrypt.hash(password, 10, async (error, hashedPassword) => {
    //   if (error) throw error;

    //   newUser.password = hashedPassword;
    //   // console.log(hashedPassword);
    //   const response = await newUser.save();
    //   // console.log(response);
    // });
    const response = await newUser.save();
    console.log(response);
    const token = createSecretToken(response._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(200).json({
      message: "Registraation successful",
      success: true,
    });
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Registraation fail", success: false });
  }
};

const userLogin = async (req, res, next) => {
  try {
    const findUser = await User.findOne({
      email: req.body.email,
    });

    if (!findUser) {
      console.log("Wrong credentials");
      res.status(400).json({ message: "Wrong credentials" });
    } else {
      const match = await bcrypt.compare(req.body.password, findUser.password);
      if (!match) {
        console.log("Wrong credentials");
        res.status(401).json({ message: "Wrong credentials" });
      } else {
        const token = createSecretToken(findUser._id);
        res.cookie("token", token, {
          withCredentials: true,
          httpOnly: false,
        });
        res.status(201).json({ message: "Login successful!", success: true });
        next();
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Server erros" });
  }
};

const getUser = async (req, res) => {
  try {
    const query = await User.findById({ _id: req.params.id });
    res.status(200).send({
      data: query,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const query = await User.find();
    res.status(200).send({
      data: query,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const saveUserAddr = async (req, res) => {
  try {
    const id = req.params.id;
    const findUser = await User.findById(id);
    if (findUser) {
      const query = await User.findByIdAndUpdate(
        id,
        { address: req.body },
        { new: true }
      );
      res.status(200).send({
        data: query,
        success: true,
      });
    } else {
      res.status(400).send("No user found with this id!");
    }
    // const {userId, street, city, state, postalCode, country} = req.body;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  userRegistration,
  userLogin,
  getUser,
  getAllUser,
  saveUserAddr,
};
