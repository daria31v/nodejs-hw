
const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD} = process.env;

const config = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
        user: "daria.v.s@meta.ua",
        pass: META_PASSWORD
    }
};

const transporter = nodemailer.createTransport(config);

const emailOptions = {
    from: "daria.v.s@meta.ua",
    to: "darya.vdovichenko86@gmail.com",
    subject: "Test email",
    html: "<p><b>Test email</b></p>"
}

transporter.sendMail(emailOptions)
.then(()=> console.log("Email send success"))
.catch(error => console.log(error.message));
