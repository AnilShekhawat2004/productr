import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";

import Upload from "./Upload";

import {
  createProduct,
  editProducts,
} from "../../../services/operations/productAPI";

import { setEditProduct, setProduct } from "../../../slices/productSlice";

const typeDrop = [
  { id: "Foods", productType: "Foods" },
  { id: "Electronics", productType: "Electronics" },
  { id: "Clothes", productType: "Clothes" },
  { id: "BeautyProducts", productType: "Beauty Products" },
  { id: "Others", productType: "Others" },
];

function AddProducts() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, setProducts } = useOutletContext();

  const { token } = useSelector((state) => state.auth);

  const { product, editProduct } = useSelector((state) => state.product);

  const [loading, setLoading] = useState(false);

  const inputStyle =
    "w-full h-[40px] px-4 rounded-[10px] bg-white text-gray-700 placeholder-gray-400 border border-gray-300 outline-none flex items-center leading-none focus:ring-2 focus:ring-[#071074]/30";

  useEffect(() => {
    if (editProduct && product) {
      reset({
        productName: product?.productName || "",
        productType: product?.productType || "",
        productQuantity: product?.productQuantity || "",
        productMrp: product?.productMrp || "",
        productPrice: product?.productPrice || "",
        brandName: product?.brandName || "",
        productReturn: product?.productReturn || "Yes",
      });
    }
  }, [editProduct, product, reset]);

  const isFormUpdated = () => {
    const currentValues = getValues();

    return (
      currentValues.productName !== product?.productName ||
      currentValues.productType !== product?.productType ||
      currentValues.productQuantity !== product?.productQuantity ||
      currentValues.productMrp !== product?.productMrp ||
      currentValues.productPrice !== product?.productPrice ||
      currentValues.brandName !== product?.brandName ||
      currentValues.productReturn !== product?.productReturn
    );
  };

  const onSubmit = async (data) => {
    if (editProduct) {
      if (isFormUpdated() || data.thumbnailImage?.length > 0) {
        const currentValues = getValues();

        const formData = new FormData();

        formData.append("productId", product._id);

        if (currentValues.productName !== product.productName) {
          formData.append("productName", data.productName);
        }

        if (currentValues.productType !== product.productType) {
          formData.append("productType", data.productType);
        }

        if (currentValues.productQuantity !== product.productQuantity) {
          formData.append("productQuantity", data.productQuantity);
        }

        if (currentValues.productMrp !== product.productMrp) {
          formData.append("productMrp", data.productMrp);
        }

        if (currentValues.productPrice !== product.productPrice) {
          formData.append("productPrice", data.productPrice);
        }

        if (currentValues.brandName !== product.brandName) {
          formData.append("brandName", data.brandName);
        }

        if (currentValues.productReturn !== product.productReturn) {
          formData.append("productReturn", data.productReturn);
        }

        if (data.thumbnailImage?.length > 0) {
          data.thumbnailImage.forEach((file) => {
            formData.append("thumbnailImage", file);
          });
        }

        setLoading(true);

        const result = await editProducts(formData, token);

        setLoading(false);

        if (result) {
          dispatch(setProduct(result));
          dispatch(setEditProduct(false));
          setProducts((prev) =>
            prev.map((item) => (item._id === result._id ? result : item)),
          );
          navigate("/product");
        }

        return;
      } else {
        toast.error("No changes made");
        return;
      }
    }

    const formData = new FormData();

    formData.append("productName", data.productName);
    formData.append("productType", data.productType);
    formData.append("productQuantity", data.productQuantity);
    formData.append("productMrp", data.productMrp);
    formData.append("productPrice", data.productPrice);
    formData.append("brandName", data.brandName);
    formData.append("productReturn", data.productReturn);

    if (data.thumbnailImage?.length > 0) {
      data.thumbnailImage.forEach((file) => {
        formData.append("thumbnailImage", file);
      });
    }

    setLoading(true);

    const result = await createProduct(formData, token);

    setLoading(false);

    if (result) {
      dispatch(setProduct(result));
      setProducts((prev) => [result, ...prev]);
      navigate("/product");
    }
  };

  const onCancel = () => {
    dispatch(setEditProduct(false));

    navigate("/product");
  };

  console.log("REDUX PRODUCT:", product);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[2px] p-3">
      <div className="flex max-h-[90vh] w-full max-w-[500px] flex-col rounded-xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <h2 className="text-xl font-semibold text-bhawaniDark">
            {editProduct ? "Edit Product" : "Add Product"}
          </h2>

          <button
            type="button"
            onClick={onCancel}
            className="cursor-pointer rounded-full px-4 py-[10px] text-2xl text-gray-600 transition-all duration-300 hover:bg-gray-300"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 space-y-5 overflow-y-auto px-5 py-5"
        >
          <div>
            <label className="text-black text-[0.9rem]">Product Name</label>

            <input
              type="text"
              placeholder="Enter Product Name"
              className={inputStyle}
              {...register("productName", {
                required: true,
              })}
            />

            {errors.productName && (
              <span className="text-sm text-red-500">
                Product Name is required
              </span>
            )}
          </div>

          <div>
            <label className="text-black text-[0.9rem]">Product Type</label>

            <select
              className={inputStyle}
              {...register("productType", {
                required: true,
              })}
            >
              <option value="" disabled>
                Select Product Type
              </option>

              {typeDrop.map((item) => (
                <option key={item.id} value={item.productType}>
                  {item.productType}
                </option>
              ))}
            </select>

            {errors.productType && (
              <span className="text-sm text-red-500">
                Product Type is required
              </span>
            )}
          </div>

          <div>
            <label className="text-black text-[0.9rem]">Quantity Stock</label>

            <input
              type="number"
              placeholder="Total number of stock available"
              className={inputStyle}
              {...register("productQuantity", {
                required: true,
              })}
            />

            {errors.productQuantity && (
              <span className="text-sm text-red-500">Quantity is required</span>
            )}
          </div>

          <div>
            <label className="text-black text-[0.9rem]">MRP</label>

            <input
              type="number"
              placeholder="Enter Product MRP"
              className={inputStyle}
              {...register("productMrp", {
                required: true,
              })}
            />

            {errors.productMrp && (
              <span className="text-sm text-red-500">
                Product MRP is required
              </span>
            )}
          </div>

          <div>
            <label className="text-black text-[0.9rem]">Selling Price</label>

            <input
              type="number"
              placeholder="Enter Product Selling Price"
              className={inputStyle}
              {...register("productPrice", {
                required: true,
              })}
            />

            {errors.productPrice && (
              <span className="text-sm text-red-500">
                Product Price is required
              </span>
            )}
          </div>

          <div>
            <label className="text-black text-[0.9rem]">Brand Name</label>

            <input
              type="text"
              placeholder="Enter Brand Name"
              className={inputStyle}
              {...register("brandName", {
                required: true,
              })}
            />

            {errors.brandName && (
              <span className="text-sm text-red-500">
                Brand Name is required
              </span>
            )}
          </div>

          <div>
            <Upload
              key={product?._id}
              name="thumbnailImage"
              label="Upload Product Images"
              register={register}
              setValue={setValue}
              errors={errors}
              multiple={true}
              editData={editProduct ? product?.images || [] : []}
            />
          </div>

          <div>
            <label className="text-black text-[0.9rem]">
              Exchange or return eligibility
            </label>

            <select className={inputStyle} {...register("productReturn")}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="flex justify-end pt-3">
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-[#1e2f97] px-6 py-2 font-medium text-white shadow-md transition-all duration-300 hover:scale-[1.02]"
            >
              {loading
                ? editProduct
                  ? "Updating..."
                  : "Creating..."
                : editProduct
                  ? "Update"
                  : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProducts;
