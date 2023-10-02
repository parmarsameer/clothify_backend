const Seller = require("../models/seller");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { createSecretToken } = require("../util/SecretToken");
// const transporter = require("../util/MailService");
const randomstring = require("randomstring");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_SERVICE_ID,
    pass: process.env.MAIL_SERVICE_PASSWORD,
  },
});

const sellerRegistration = async (req, res) => {
  try {
    const { ownerName, brandName, email, profilePicture } = req.body;
    const emailExist = await Seller.findOne({
      email,
    });

    if (emailExist) {
      console.log("Email is alredy exist");
      res.status(400).json({
        message: "Email is alredy exist",
        success: false,
      });
    } else {
      const password = randomstring.generate({
        length: 8,
      });

      const newSeller = new Seller({
        ownerName,
        brandName,
        email,
        password,
        profilePicture,
      });

      const mailOption = {
        to: email,
        subject: "Welcome to Clothify",
        html:
          `<h3>Hello ${ownerName}, Your brand ${brandName} is now a member of Clothify</h3>` +
          `<h4>Your login username is your email id and password is</h4>` +
          "<h1 style='font-weight:bold;'>" +
          password +
          "</h1>" +
          "<br> <br>" +
          "<p>Thank you,</p>" +
          "<p>Team Clothify</p>",
      };

      transporter.sendMail(mailOption, async function (error, info) {
        if (error) {
          res.status(402).json({ message: error });
        } else {
          console.log("Email sent: " + info.response);
          const query = await newSeller.save();
          res.status(201).json({
            message: "Registration Successfull",
            success: true,
          });
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const sellerLogIn = async (req, res) => {
  try {
    const findUser = await Seller.findOne({
      email: req.body.email,
    });

    if (findUser) {
      const match = await bcrypt.compare(req.body.password, findUser.password);
      if (match) {
        const token = createSecretToken(findUser._id);
        // console.log(token);
        res.cookie("token", token, {
          withCredentials: true,
          httpOnly: false,
        });
        res
          .status(201)
          .json({
            message: "Login successful!",
            success: true,
            user: findUser,
          });
      } else {
        console.log("Wrong credentials");
        res.status(401).json({ message: "Wrong credentials" });
      }
    } else {
      console.log("Wrong credentials");
      res.status(400).json({ message: "Wrong credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const getSeller = async (req, res) => {
  try {
    const query = await Seller.findById({ _id: req.params.id });
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

const getAllSeller = async (req, res) => {
  try {
    const query = await Seller.find();
    res.status(200).send({
      data: query,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sellerRegistration,
  sellerLogIn,
  getSeller,
  getAllSeller,
};
