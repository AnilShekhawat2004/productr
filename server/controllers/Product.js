const Product = require("../models/product");
const User = require("../models/user");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

require("dotenv").config();

exports.createProduct = async (req, res) => {
  try {
    const {
      productName,
      productType,
      productQuantity,
      productMrp,
      productPrice,
      brandName,
      productReturn,
      status,
    } = req.body;

    const files = req.files.thumbnailImage;
    const userId = req.user.id;

    if (
      !productName ||
      !productType ||
      !productQuantity ||
      !productMrp ||
      !productPrice ||
      !brandName
    ) {
      return res.status(404).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!files) {
      return res.status(404).json({
        success: false,
        message: "No images are uploaded",
      });
    }

    const imagesArray = Array.isArray(files) ? files : [files];

    if (imagesArray.length > 5) {
      return res.status(400).json({
        message: "Maximum 5 images allowed",
      });
    }

    const uploadedImages = [];

    for (const file of imagesArray) {
      const result = await uploadImageToCloudinary(file, "products");

      uploadedImages.push(result.secure_url);
    }

    const newProduct = await Product.create({
      productName: productName,
      productType: productType,
      productQuantity: productQuantity,
      productMrp: productMrp,
      productPrice: productPrice,
      brandName: brandName,
      images: uploadedImages,
      productReturn: productReturn,
      status: status,
      user: userId,
    });

    await User.findByIdAndUpdate(userId, {
      $push: { product: newProduct._id },
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.editProduct = async (req, res) => {
  try {
    const {
      productId,
      productName,
      productType,
      productQuantity,
      productMrp,
      productPrice,
      brandName,
      productReturn,
    } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (productName !== undefined) product.productName = productName;
    if (productType !== undefined) product.productType = productType;
    if (productQuantity !== undefined)
      product.productQuantity = productQuantity;
    if (productMrp !== undefined) product.productMrp = productMrp;
    if (productPrice !== undefined) product.productPrice = productPrice;
    if (brandName !== undefined) product.brandName = brandName;
    if (productReturn !== undefined) product.productReturn = productReturn;

    if (req.files && req.files.thumbnailImage) {
      const files = Array.isArray(req.files.thumbnailImage)
        ? req.files.thumbnailImage
        : [req.files.thumbnailImage];

      const uploadedImages = [];

      for (const file of files) {
        const result = await uploadImageToCloudinary(file, "products");
        uploadedImages.push(result.secure_url);
      }

      product.images = uploadedImages;
    }

    await product.save();

    return res.status(200).json({
      success: true,
      message: "product edited successfully",
      data: product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getProductDetails = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(404).json({
        success: false,
        message: "Product Id not found",
      });
    }

    const products = await Product.findById(productId);

    if (!products) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        products,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    const product = await Product.findById(productId);

    if (!productId) {
      return res.status(404).json({
        success: false,
        message: "Product id not found",
      });
    }

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await Product.findByIdAndDelete(productId);

    await User.findByIdAndUpdate(userId, {
      $pull: { product: productId },
    });

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "User Id not found",
      });
    }

    const products = await Product.find({
      user: userId,
    });

    return res.status(200).json({
      success: true,
      data: {
        products: products || [],
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllStatusProducts = async (req, res) => {
  try {
    const userId = req.user.id;

    const products = await Product.find({
      user: userId,
    });

    const published = products.filter((p) => p.status === "Published");
    const unpublished = products.filter((p) => p.status === "Unpublished");

    return res.status(200).json({
      success: true,
      data: {
        published,
        unpublished,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.toggleStatus = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product.status =
      product.status === "Published" ? "Unpublished" : "Published";

    await product.save();

    return res.status(200).json({
      success: true,
      message: `Product ${
        product.status === "Published" ? "Published" : "Unpublished"
      } successfully`,
      data: product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error while changing product status",
    });
  }
};
