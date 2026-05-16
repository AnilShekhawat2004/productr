const express = require("express");
const router = express.Router();

//controller
const { signUp, login, resendOtp, verifyOtp } = require("../controllers/Auth");

//routes
router.post("/signup", signUp);
router.post("/login", login);
router.post("/resendOtp", resendOtp);
router.post("/verifyOtp", verifyOtp);

module.exports = router;
