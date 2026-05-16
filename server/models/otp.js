const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const { otp: emailTemplate } = require("../mail/templates/otp");
const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5,
  },
});

async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(email, "Verification Code", emailTemplate(otp));
    if (!mailResponse) {
      throw new Error("Mail sending failed silently");
    }
  } catch (error) {
    console.log("Error occurred while sending email: ", error);
    throw error;
  }
}

OTPSchema.pre("save", async function () {
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
});

const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;
