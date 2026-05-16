import Logo2 from "../../assets/Logo2.jpg";
import { IoIosSearch } from "react-icons/io";
import { IoHome } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { NavLink, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { logoutUser } from "../../services/operations/authAPI";
import { useDispatch } from "react-redux";

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  return (
    <aside className="w-[230px] bg-[#1D222B] text-white flex flex-col ">
      <div className="px-8 py-4 border-[#1f2937]">
        <img src={Logo2} alt="Logo2" loading="lazy" draggable="false" />
      </div>

      <div className="px-3 py-3 border-r border-[#1f2937] border-b">
        <div className="bg-[#1f2937] rounded-md flex items-center px-3 h-9">
          <IoIosSearch className="text-[20px]" />

          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none text-sm text-white placeholder-gray-400 ml-2 w-full"
          />
        </div>
      </div>

      <div className="flex flex-col gap-10 ">
        <nav className="flex flex-col mt-2 px-2 gap-1">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm cursor-pointer transition-all ${
                isActive
                  ? "bg-[#0f172a] text-white"
                  : "text-gray-400 hover:bg-[#1f2937]"
              }`
            }
          >
            <IoHome />
            <span>Home</span>
          </NavLink>

          <NavLink
            to="/product"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm cursor-pointer transition-all ${
                isActive
                  ? "bg-[#0f172a] text-white"
                  : "text-gray-400 hover:bg-[#1f2937]"
              }`
            }
          >
            <HiOutlineShoppingBag />
            <span>Products</span>
          </NavLink>
        </nav>

        <div
          onClick={() => {
            dispatch(logoutUser(navigate));
          }}
          className="px-3 py-2 ml-4 mr-4 mt-10 flex flex-row gap-2 justify-center items-center bg-[#0f172a] rounded-lg cursor-pointer"
        >
          <FiLogOut />
          <div>LogOut</div>
        </div>
      </div>
    </aside>
  );
}
