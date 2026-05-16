import { useEffect, useState } from "react";
import Sidebar from "../components/Common/Sidebar";
import Navbar from "../components/Common/Navbar";
import { useSelector } from "react-redux";

import { getAllProducts } from "../services/operations/productAPI";
import { Outlet, Link, useLocation } from "react-router-dom";
import ProductCard from "../components/core/Products/ProductCard";

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state) => state.auth);

  const location = useLocation();
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);

        const response = await getAllProducts(token);

        setProducts(response?.products || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    if (token) {
      fetchProducts();
    }
  }, [token]);

  // Modal Open Check
  const isAddProductOpen = ["/addProduct", "/editProduct"].some((path) =>
    location.pathname.includes(path),
  );

  const handleRemoveProduct = (productId) => {
    setProducts((prev) => prev.filter((product) => product._id !== productId));
  };

  return (
    <div className="flex h-screen bg-[#f5f5f5] overflow-hidden">
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <section className="flex-1 bg-[#f7f7f7] overflow-y-auto">
          {loading ? (
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-500">Loading...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-120px)]">
              <div className="relative mb-6">
                <div className="grid grid-cols-2 gap-2">
                  <div className="w-5 h-5 border-[4px] border-[#1e2f97] rounded-sm"></div>
                  <div className="w-5 h-5 border-[4px] border-[#1e2f97] rounded-sm"></div>
                  <div className="w-5 h-5 border-[4px] border-[#1e2f97] rounded-sm"></div>

                  <div className="relative flex items-center justify-center">
                    <span className="absolute text-[#1e2f97] text-4xl leading-none">
                      +
                    </span>
                  </div>
                </div>
              </div>

              <h2 className="text-xl font-semibold text-[#1f2937]">
                Feels a little empty over here...
              </h2>

              <p className="text-sm text-gray-400 mt-2 text-center leading-6">
                You can create products without connecting store <br />
                you can add products to store anytime
              </p>

              <Link
                to="/product/addProduct"
                className="text-center w-[220px] bg-[#071074] text-white mt-5 py-[10px] rounded-lg hover:bg-blue-900 transition"
              >
                Add your Products
              </Link>
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="w-full flex flex-row justify-between gap-5 px-5 mt-3">
                <p className="text-black text-[30px] font-bold">Products</p>
                <Link
                  to="/product/addProduct"
                  className="px-5 py-3 rounded-md border border-gray-400 hover:bg-gray-500 transition-all duration-300 cursor-pointer"
                >
                  + Add Products
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onDelete={handleRemoveProduct}
                  />
                ))}
              </div>
            </div>
          )}

          {isAddProductOpen && (
            <div className="fixed inset-0 bg-black/20 backdrop-blur-[2px] flex items-center justify-center z-50">
              <div className="relative bg-white rounded-xl shadow-2xl w-[420px] overflow-hidden">
                <div className="max-h-[85vh] overflow-y-auto">
                  <Outlet context={{ products, setProducts }}/>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Product;
