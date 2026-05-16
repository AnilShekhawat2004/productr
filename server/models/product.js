const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productType: {
    type: String,
    required: true,
  },
  productQuantity: {
    type: String,
    required: true,
  },
  productMrp: {
    type: Number,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  brandName: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
    },
  ],
  productReturn: {
    type: String,
    enum: ["Yes", "No"],
    default: "Yes",
  },
  status: {
    type: String,
    enum: ["Published", "Unpublished"],
    default: "Unpublished",
  },
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.models.Product || mongoose.model("Product", productSchema);