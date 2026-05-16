import { IoIosArrowDown } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { FiGrid } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";

export default function Navbar() {
  const location = useLocation();

  return (
    <div>
      <header className="h-[60px] bg-linear-to-r from-[#f7e7e7] via-[#f8f7e9] to-[#e9efff] border-b border-gray-200 flex items-center justify-between px-6">
        <div>
          {location.pathname === "/product" && (
            <div
              to="/product"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-black text-sm cursor-pointer"
            >
              <HiOutlineShoppingBag />
              <span>Products</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-7 h-7 rounded-full"
          />

          <IoIosArrowDown className="text-gray-500 text-sm" />
        </div>
      </header>
    </div>
  );
}
