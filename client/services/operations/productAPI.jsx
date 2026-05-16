import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { productEndpoints } from "../apis";

const {
  CREATE_PRODUCT_API,
  EDIT_PRODUCT_API,
  DELETE_PRODUCT_API,
  GET_ALL_PRODUCTS_API,
  GET_PRODUCT_DETAILS_API,
  GET_ALL_STATUS_PRODUCTS_API,
  TOGGLE_STATUS_API,
} = productEndpoints;

export const createProduct = async (data, token) => {
  const toastId = toast.loading("Creating Product...");
  let result = null;
  try {
    if (!token) throw new Error("Authorization Token Missing");
    const response = await apiConnector("POST", CREATE_PRODUCT_API, data, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could Not Create Product");
    }
    toast.success("Product Created Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.error("CREATE_PRODUCT_API Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const editProducts = async (data, token) => {
  const toastId = toast.loading("Updating Product...");
  let result = null;
  try {
    if (!token) throw new Error("Authorization Token Missing");
    const response = await apiConnector("PUT", EDIT_PRODUCT_API, data, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could Not Update Product");
    }
    toast.success("Product Updated Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.error("EDIT_PRODUCT_API Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const getProductDetails = async (productId, token) => {
  let result = null;
  try {
    if (!token) throw new Error("Authorization Token Missing");
    const response = await apiConnector(
      "POST",
      GET_PRODUCT_DETAILS_API,
      { productId },
      {
        Authorization: `Bearer ${token}`,
      },
    );
    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message || "Could Not get product details",
      );
    }
    result = response?.data?.data;
  } catch (error) {
    console.error("GET_PRODUCT_DETAILS_API Error:", error);
  }
  return result;
};

export const deleteProduct = async (productId, token) => {
  const toastId = toast.loading("Deleting Product...");
  try {
    if (!token) throw new Error("Authorization Token Missing");
    const response = await apiConnector(
      "DELETE",
      DELETE_PRODUCT_API,
      { productId },
      {
        Authorization: `Bearer ${token}`,
      },
    );
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could Not Delete Product");
    }
    toast.success("Product Deleted Successfully");
  } catch (error) {
    console.error("DELETE_PRODUCT_API Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  toast.dismiss(toastId);
};

export const getAllProducts = async (token) => {
  let result = null;
  try {
    const response = await apiConnector("GET", GET_ALL_PRODUCTS_API, null, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message || "Could not fetch Product Details",
      );
    }
    result = response?.data?.data;
  } catch (error) {
    console.error("Get Product API Error: ", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  return result;
};

export const getAllStatusProducts = async (token) => {
  let result = null;
  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_STATUS_PRODUCTS_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      },
    );
    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message || "Could not fetch Product status Details",
      );
    }
    result = response?.data?.data;
  } catch (error) {
    console.error("Get Product Status API Error: ", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  return result;
};

export const toggleStatus = async (productId, token) => {
  let result = null;
  try {
    const response = await apiConnector(
      "PUT",
      TOGGLE_STATUS_API,
      {
        productId,
      },
      {
        Authorization: `Bearer ${token}`,
      },
    );
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not update status");
    }
    result = response?.data?.data;
  } catch (error) {
    console.error("Toggle status API Error: ", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  return result;
};
