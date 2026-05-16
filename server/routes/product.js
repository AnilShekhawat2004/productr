const express = require("express");
const router = express.Router();

//middleware
const { auth } = require("../middleware/auth");

//controller
const {
  createProduct,
  editProduct,
  deleteProduct,
  getAllProducts,
  getAllStatusProducts,
  getProductDetails,
  toggleStatus,
} = require("../controllers/Product");

//routes
router.post("/createProduct", auth, createProduct);
router.put("/editProduct", auth, editProduct);
router.delete("/deleteProduct", auth, deleteProduct);
router.get("/getAllProducts", auth, getAllProducts);
router.post("/getProductDetails", auth, getProductDetails);
router.get("/getAllStatusProducts", auth, getAllStatusProducts);
router.put("/toggleStatus", auth, toggleStatus);

module.exports = router;
