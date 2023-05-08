const nodemailer = require("nodemailer");
const { SENDER_EMAIL, MAILTRAP_USER, MAILTRAP_PASS } = process.env;

function sendEmails(email) {
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: MAILTRAP_USER,
      pass: MAILTRAP_PASS,
    },
  });
  return transporter.sendMail({...email, from: SENDER_EMAIL});
}

module.exports =  sendEmails ;
