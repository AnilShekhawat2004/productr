import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { getProductDetails } from "../../../services/operations/productAPI";

import { setProduct, setEditProduct } from "../../../slices/productSlice";

import AddProducts from "./AddProducts";
import LoaderOverlay from "../../Common/LoaderOverlay";

function EditProduct() {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(true);

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const productId = queryParams.get("id");

  useEffect(() => {
    if (!productId) return;

    const fetchProductDetails = async () => {
      setLoading(true);

      const result = await getProductDetails(productId, token);
      console.log("EDIT PRODUCT RESULT:", result);

      if (result) {
        dispatch(setEditProduct(true));
        dispatch(setProduct(result.products));
      }

      setLoading(false);
    };

    fetchProductDetails();

    return () => {
      dispatch(setEditProduct(false));
      dispatch(setProduct(null));
    };
  }, [productId, token, dispatch]);

  if (loading) {
    return <LoaderOverlay />;
  }

  return <AddProducts />;
}

export default EditProduct;
