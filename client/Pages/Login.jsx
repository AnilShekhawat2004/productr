import { Link, useNavigate } from "react-router-dom";
import Landing from "../components/Common/landing";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { login } from "../services/operations/authAPI"

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((pervData) => ({
      ...pervData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };

  return (
    <div className="flex w-full h-screen bg-[#F7F8FA]">
      <Landing />

      <form
        onSubmit={handleOnSubmit}
        className="w-1/2 flex flex-col items-center justify-center p-[5%]"
      >
        <div className="w-full max-w-[420px] flex flex-col gap-7">
          <h2 className="text-[#111652] text-[1.4rem] font-semibold text-center">
            Login to your Productr Account
          </h2>

          <div className="flex flex-col gap-1 pl-8">
            <div>
              <label className="text-black text-[0.9rem]">Email</label>

              <input
                required
                type="text"
                name="email"
                value={email}
                onChange={handleOnChange}
                placeholder="Enter your email"
                className="w-full h-[40px] px-4 rounded-[10px] bg-[#ffff] text-gray-700 placeholder-gray-400 border border-gray-300 outline-none flex items-center leading-none focus:ring-2 focus:ring-[#071074]/30"
              />
            </div>

            <label>
              <p className="text-black text-[0.9rem] mb-1">Password</p>

              <div className="relative w-full">
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={handleOnChange}
                  placeholder="Enter your password"
                  className="w-full h-[40px] px-4 pr-12 rounded-[10px] bg-white text-gray-700 placeholder-gray-400 border border-gray-300 outline-none focus:ring-2 focus:ring-[#071074]/30"
                />

                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer flex items-center"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible
                      size={20}
                      className="text-gray-600"
                    />
                  ) : (
                    <AiOutlineEye size={20} className="text-gray-600" />
                  )}
                </span>
              </div>
            </label>

            <button
              type="submit"
              className="w-full bg-[#071074] text-white mt-5 py-3 rounded-lg hover:bg-blue-900 transition cursor-pointer"
            >
              Login
            </button>
          </div>

          <div className="text-center flex flex-col justify-center items-center mt-[90px] border border-gray-300 rounded-lg w-[300px] h-[80px] ml-20">
            <p className="text-gray-500 text-sm">
              Don’t have a Productr Account
            </p>
            <Link
              to="/signUp"
              className="text-blue-400 cursor-pointer text-sm hover:underline"
            >
              SignUp Here
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
