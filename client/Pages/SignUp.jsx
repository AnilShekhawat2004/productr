import { Link, useNavigate } from "react-router-dom";
import Landing from "../components/Common/landing";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { signUp } from "../services/operations/authAPI";
import { useDispatch } from "react-redux";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { firstName, lastName, email, password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData((pervData) => ({
      ...pervData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(
      signUp(firstName, lastName, email, password, confirmPassword, navigate),
    );
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
            Get started with Productr
          </h2>

          <div className="flex flex-col gap-4 pl-8">
            <div className="flex flex-row gap-2">
              <div>
                <label className="text-black text-[0.9rem]">First Name</label>

                <input
                  required
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={handleOnChange}
                  placeholder="Enter first name"
                  className="w-full h-[40px] px-4 rounded-[10px] bg-[#ffff] text-gray-700 placeholder-gray-400 border border-gray-300 outline-none flex items-center leading-none focus:ring-2 focus:ring-[#071074]/30"
                />
              </div>
              <div>
                <label className="text-black text-[0.9rem]">Last Name</label>

                <input
                  required
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={handleOnChange}
                  placeholder="Enter last name"
                  className="w-full h-[40px] px-4 rounded-[10px] bg-[#ffff] text-gray-700 placeholder-gray-400 border border-gray-300 outline-none flex items-center leading-none focus:ring-2 focus:ring-[#071074]/30"
                />
              </div>
            </div>
            <div>
              <label className="text-black text-[0.9rem]">Email</label>

              <input
                required
                type="text"
                name="email"
                value={email}
                onChange={handleOnChange}
                placeholder="Enter email"
                className="w-full h-[40px] px-4 rounded-[10px] bg-[#ffff] text-gray-700 placeholder-gray-400 border border-gray-300 outline-none flex items-center leading-none focus:ring-2 focus:ring-[#071074]/30"
              />
            </div>

            <div className="flex flex-row gap-2">
              <label>
                <p className="text-black text-[0.9rem] mb-1">Password</p>

                <div className="relative w-full">
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={handleOnChange}
                    placeholder="Enter password"
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
              <label>
                <p className="text-black text-[0.9rem] mb-1">
                  Confirm Password
                </p>

                <div className="relative w-full">
                  <input
                    required
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleOnChange}
                    placeholder="Confirm password"
                    className="w-full h-[40px] px-3 pr-12 rounded-[10px] bg-white text-gray-700 placeholder-gray-400 border border-gray-300 outline-none focus:ring-2 focus:ring-[#071074]/30"
                  />

                  <span
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer flex items-center"
                  >
                    {showConfirmPassword ? (
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
            </div>

            <button
              type="submit"
              className="w-full bg-[#071074] text-white mt-5 py-3 rounded-lg hover:bg-blue-900 transition cursor-pointer"
            >
              Create Account
            </button>
          </div>

          <div className="text-center flex flex-col justify-center items-center mt-[90px] border border-gray-300 rounded-lg w-[300px] h-[80px] ml-20">
            <p className="text-gray-500 text-sm">Have a Productr Account</p>
            <Link
              to="/login"
              className="text-blue-400 cursor-pointer text-sm hover:underline"
            >
              SignIn Here
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
