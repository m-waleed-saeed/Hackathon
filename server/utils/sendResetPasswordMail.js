const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const{ EMAIL_USER, EMAIL_PASS} = process.env;

const sendResetPasswordMail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
      user: EMAIL_USER, 
      pass: EMAIL_PASS, 
    },
  });

  const mailOptions = {
    from: `"Hackathon Project" <${EMAIL_USER}>`,
    to: options.to,
    subject: options.subject,
    html: options.html,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendResetPasswordMail;
