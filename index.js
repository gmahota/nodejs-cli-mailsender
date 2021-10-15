var dotenv = require('dotenv');
var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");

dotenv.config();

var transporter = nodemailer.createTransport(
  smtpTransport({
    host: process.env.HOST,
    port: process.env.PORT,
    secure: false,
    auth: {
      user: process.env.MAIL_AUTH_USER,
      pass: process.env.MAIL_AUTH_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  })
);

var mailOptions = {
  from: process.env.MAIL_AUTH_USER,
  to: "guimaraesmahota@gmail.com",
  subject: "Sending Email using Node.js",
  text: "That was easy!",
};

// verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
