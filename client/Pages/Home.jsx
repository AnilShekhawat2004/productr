import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Sidebar from "../components/Common/Sidebar";
import Navbar from "../components/Common/Navbar";
import ProductCard from "../components/core/Products/ProductCard";

import { getAllStatusProducts } from "../services/operations/productAPI";

function Home() {
  const { token } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(true);

  const [publishedProducts, setPublishedProducts] = useState([]);
  const [unpublishedProducts, setUnpublishedProducts] = useState([]);

  const [activeTab, setActiveTab] = useState("Published");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await getAllStatusProducts(token);

        if (response) {
          setPublishedProducts(response.published || []);
          setUnpublishedProducts(response.unpublished || []);
        }
      } catch (error) {
        console.log("FETCH PRODUCTS ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token]);

  const currentProducts =
    activeTab === "Published" ? publishedProducts : unpublishedProducts;

  const handleRemoveProduct = (productId) => {
    setPublishedProducts((prev) =>
      prev.filter((product) => product._id !== productId),
    );

    setUnpublishedProducts((prev) =>
      prev.filter((product) => product._id !== productId),
    );
  };

  return (
    <div className="flex h-screen bg-[#f5f5f5] overflow-hidden">
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <section className="flex-1 bg-[#f7f7f7] overflow-y-auto">
          <div className="border-b border-gray-200 px-6">
            <div className="flex gap-6 text-sm">
              <button
                onClick={() => setActiveTab("Published")}
                className={`h-12 border-b-2 font-medium transition ${
                  activeTab === "Published"
                    ? "border-blue-500 text-[#111827]"
                    : "border-transparent text-gray-400"
                }`}
              >
                Published
              </button>

              <button
                onClick={() => setActiveTab("Unpublished")}
                className={`h-12 border-b-2 font-medium transition ${
                  activeTab === "Unpublished"
                    ? "border-blue-500 text-[#111827]"
                    : "border-transparent text-gray-400"
                }`}
              >
                Unpublished
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-lg font-medium text-gray-500">Loading...</p>
            </div>
          ) : currentProducts.length === 0 ? (
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
                No {activeTab} Products
              </h2>

              <p className="text-sm text-gray-400 mt-2 text-center leading-6">
                Your {activeTab} Products will appear here
                <br />
                Create your first product
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {currentProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onDelete={handleRemoveProduct}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Home;
