const nodemailer = require("nodemailer");

require("dotenv").config();

const { META_PASSWORD } = process.env;
const emailSend = async () => {
  // let testAccount = await nodemailer.createTestAccount();
  const config = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
      user: "daria.v.s@meta.ua",
      pass: META_PASSWORD,
    },
  };

  const transporter = nodemailer.createTransport(config);

  const email = {
    from: "daria.v.s@meta.ua",
    to: "ooymez@fexpost.com",
    subject: "Test email",
    html: "<p><b>Test email</b></p>",
  };

  transporter
    .sendMail(email)
    .then((info) => console.log(info, "Email send success"))
    .catch((error) => console.log(error.message));
}

module.exports = emailSend;
