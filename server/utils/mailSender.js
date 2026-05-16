const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  pool: true,          
  maxConnections: 5,   
  maxMessages: 100,    
  rateDelta: 1000,    
  rateLimit: 5,         
});

transporter.verify((error) => {
  if (error) {
    console.error("Mail transporter error:", error);
  } else {
    console.log("Mail server is ready");
  }
});

const mailSender = async (email, title, body) => {
  try {
    const info = await transporter.sendMail({
      from: `"Productr" <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
    });
    return info;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

module.exports = mailSender;