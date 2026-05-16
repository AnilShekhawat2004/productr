import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: null,
  editProduct: false,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct(state, action) {
      state.product = action.payload;
    },
    setEditProduct(state, action) {
      state.editProduct = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setProduct, setEditProduct, setLoading, setError } =
  productSlice.actions;
export default productSlice.reducer;
