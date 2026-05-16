const BASE_URL = import.meta.env.VITE_BACKEND_URL;

//Auth endpoints
export const authEndpoints = {
  SIGNUP_API: BASE_URL + "/api/v1/auth/signup",
  LOGIN_API: BASE_URL + "/api/v1/auth/login",
  RESEND_OTP_API: BASE_URL + "/api/v1/auth/resendOtp",
  VERIFY_OTP_API: BASE_URL + "/api/v1/auth/verifyOtp",
};

//Product endpoints
export const productEndpoints = {
  CREATE_PRODUCT_API: BASE_URL + "/api/v1/product/createProduct",
  EDIT_PRODUCT_API: BASE_URL + "/api/v1/product/editProduct",
  DELETE_PRODUCT_API: BASE_URL + "/api/v1/product/deleteProduct",
  GET_ALL_PRODUCTS_API: BASE_URL + "/api/v1/product/getAllProducts",
  GET_PRODUCT_DETAILS_API: BASE_URL + "/api/v1/product/getProductDetails",
  GET_ALL_STATUS_PRODUCTS_API: BASE_URL + "/api/v1/product/getAllStatusProducts",
  TOGGLE_STATUS_API: BASE_URL + "/api/v1/product/toggleStatus",
};
