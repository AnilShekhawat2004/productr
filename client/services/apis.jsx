const BASE_URL = import.meta.env.VITE_BACKEND_URL;

//Auth endpoints
export const authEndpoints = {
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESEND_OTP_API: BASE_URL + "/auth/resendOtp",
  VERIFY_OTP_API: BASE_URL + "/auth/verifyOtp",
};

//Product endpoints
export const productEndpoints = {
  CREATE_PRODUCT_API: BASE_URL + "/product/createProduct",
  EDIT_PRODUCT_API: BASE_URL + "/product/editProduct",
  DELETE_PRODUCT_API: BASE_URL + "/product/deleteProduct",
  GET_ALL_PRODUCTS_API: BASE_URL + "/product/getAllProducts",
  GET_PRODUCT_DETAILS_API: BASE_URL + "/product/getProductDetails",
  GET_ALL_STATUS_PRODUCTS_API: BASE_URL + "/product/getAllStatusProducts",
  TOGGLE_STATUS_API: BASE_URL + "/product/toggleStatus",
};
