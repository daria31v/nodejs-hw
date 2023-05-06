// const nodemailer = require("nodemailer");
// require("dotenv").config();
// const { META_PASSWORD, SENDER_EMAIL } = process.env;

// const transporter = nodemailer.createTransport({
//   host: "smtp.meta.ua",
//   port: 465,
//   secure: false,
//   auth: {
//     user: SENDER_EMAIL,
//     pass: META_PASSWORD,
//   },
//   tls: { rejectUnauthorized: false },
 
// });
// const sendEmail = async (data) => {
//   // console.log(data);
//   await transporter
//     .sendMail(data)
//     .then((info) => console.log(info, "Message sent"))
//     .catch((err) => console.log(err));
// };
// // const transporter = nodemailer.createTransport(config);
// // const verifyEmail = {
// //   from: SENDER_EMAIL,
// //   to: `${email}`,
// //   subject: "Verify email",
// //   html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}>Click verify email</a>`,
// // };
// // console.log(verifyEmail);

// // transporter
// //   .sendMail()
// //   .then((info) => console.log(info))
// //   .catch((err) => console.log(err));

// // const transporter = nodemailer.createTransport(config);
// // const info = {
// //       from: "daria.v.s@meta.ua",
// //       to: "darya.vdovichenko86@gmail.com",
// //       subject: "Test email",
// //       text: "Click verify email"
// //     };
// //     console.log(info.messageId);
// //     transporter.sendMail(info)
// //     .then(info => console.log(info))
// //     .catch(err => console.log(err));

// module.exports = sendEmail;
