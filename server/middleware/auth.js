const jwt = require("jsonwebtoken");
require("dotenv").config();

// Auth Middleware
exports.auth = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      req.body?.token ||
      (req.header("Authorization") &&
      req.header("Authorization").startsWith("Bearer ")
        ? req.header("Authorization").split(" ")[1]
        : null);

    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    try {
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }
  } catch (error) {
    console.error("Error in auth middleware:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};