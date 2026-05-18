const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const mailSender = async (email, title, body) => {
  try {
    const msg = {
      to: email,
      from: process.env.MAIL_USER,
      subject: title,
      html: body,
    };

    const response = await sgMail.send(msg);
    return response;
  } catch (error) {
    console.log(" SendGrid Error:", error.response?.body || error.message);
    throw error;
  }
};

module.exports = mailSender;
