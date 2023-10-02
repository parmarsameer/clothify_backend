const nodemailer = require("nodemailer");

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

module.exports = transporter;
