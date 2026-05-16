import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  FiChevronLeft,
  FiChevronRight,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  deleteProduct,
  toggleStatus,
} from "../../../services/operations/productAPI";

function ProductCard({ product, onDelete }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(product.status);
  const [statusLoading, setStatusLoading] = useState(false);

  const { token } = useSelector((state) => state.auth);

  const handleDelete = async () => {
    try {
      setLoading(true);

      await deleteProduct(product._id, token);

      onDelete(product._id);

      toast.success("Product Deleted Successfully");
    } catch (error) {
      console.log("DELETE PRODUCT ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async () => {
    try {
      setStatusLoading(true);

      const response = await toggleStatus(product._id, token);

      if (response) {
        setStatus(response.status);
      }
    } catch (error) {
      console.log("STATUS TOGGLE ERROR:", error);
    } finally {
      setStatusLoading(false);
    }
  };

  const nextImage = () => {
    setCurrentImage((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1,
    );
  };

  return (
    <div className="w-full max-w-[550px] rounded-[24px] border border-gray-200 bg-white p-4 shadow-md ml-5 mt-5">
      <div className="relative overflow-hidden rounded-[18px] border border-gray-200 bg-[#f5f5f5]">
        <img
          src={product.images[currentImage]}
          alt={product.productName}
          className="h-[180px] w-full object-contain"
        />

        {product.images.length > 1 && (
          <button
            onClick={prevImage}
            className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-md transition hover:scale-105"
          >
            <FiChevronLeft className="text-xl text-gray-700" />
          </button>
        )}

        {product.images.length > 1 && (
          <button
            onClick={nextImage}
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-md transition hover:scale-105"
          >
            <FiChevronRight className="text-xl text-gray-700" />
          </button>
        )}

        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/90 px-3 py-1 shadow">
            {product.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                  currentImage === index ? "bg-[#ff6b4a] w-5" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <h2 className="mt-4 text-[22px] font-semibold text-black">
        {product.productName}
      </h2>

      <div className="mt-4 space-y-2 text-[15px]">
        <div className="flex items-center justify-between">
          <p className="font-medium text-[#9ca3af]">Product type -</p>
          <p className="text-[#4b5563]">{product.productType}</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="font-medium text-[#9ca3af]">Quantity Stock -</p>
          <p className="text-[#4b5563]">{product.productQuantity}</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="font-medium text-[#9ca3af]">MRP -</p>
          <p className="text-[#4b5563]">₹ {product.productMrp}</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="font-medium text-[#9ca3af]">Selling Price -</p>
          <p className="text-[#4b5563]">₹ {product.productPrice}</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="font-medium text-[#9ca3af]">Brand Name -</p>
          <p className="text-[#4b5563]">{product.brandName}</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="font-medium text-[#9ca3af]">Total Number of images -</p>
          <p className="text-[#4b5563]">{product.images.length}</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="font-medium text-[#9ca3af]">Exchange Eligibility -</p>
          <p className="uppercase text-[#4b5563]">{product.productReturn}</p>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button
          onClick={handleToggleStatus}
          disabled={statusLoading}
          className={`flex-1 rounded-[12px] py-2.5 text-[16px] font-semibold text-white cursor-pointer transition disabled:opacity-50 ${
            status === "Published"
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-[#55d400] hover:bg-[#49bb00]"
          }`}
        >
          {statusLoading
            ? "Loading..."
            : status === "Published"
              ? "Published"
              : "Unpublished"}
        </button>

        <Link
          to={`/product/editProduct?id=${product._id}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-[14px] border border-gray-300 bg-white py-3 text-[18px] font-semibold text-[#374151] transition hover:bg-gray-100"
        >
          <FiEdit2 />
          Edit
        </Link>

        <button
          onClick={handleDelete}
          disabled={loading}
          className="flex h-[48px] w-[48px] cursor-pointer items-center justify-center rounded-[14px] border border-gray-300 bg-white text-gray-500 transition hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
        >
          <FiTrash2 className="text-[22px]" />
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
