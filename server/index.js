const express = require("express");
const app = express();

require("dotenv").config();

const database = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")

// Load config from file
const PORT = process.env.PORT || 4000;

// Connect to the database
database.connect();

// Connect to Cloudinary
cloudinaryConnect();

app.use(cookieParser());
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:5173",],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//routes
app.use("/api/v1/auth", authRoute)
app.use("/api/v1/product", productRoute)

// Server response check
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is running...",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});