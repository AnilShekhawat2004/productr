import { Link, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import Landing from "../components/Common/landing";
import { useDispatch, useSelector } from "react-redux";
import { verifyOTP, resendOTP } from "../services/operations/authAPI";

function VerfiyOtp() {
  const { email } = useSelector((state) => state.auth);

  const [otpArray, setOtpArray] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  
  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otpArray];
    newOtp[index] = value.slice(-1);
    setOtpArray(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otpArray[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const finalOtp = otpArray.join("");
    dispatch(verifyOTP(email, finalOtp, navigate));
  };

  const handleResend = () => {
    dispatch(resendOTP(email));
    setTimer(20);
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
            Verify OTP
          </h2>

          <div className="flex flex-col gap-4">
            <label className="text-black text-[0.9rem] ml-1">
              Enter OTP
            </label>

            <div className="flex gap-3 justify-center">
              {otpArray.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  ref={(el) => (inputRefs.current[index] = el)}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-14 h-14 text-center text-xl font-semibold border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#071074]/30 focus:border-[#071074]"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-[#071074] text-white mt-3 py-3 rounded-lg hover:bg-blue-900 transition cursor-pointer"
            >
              Verify OTP
            </button>
          </div>

          <div className="text-center flex flex-row gap-1 items-center justify-center">
            <p className="text-gray-500 text-sm">
              Didn't receive OTP ?
            </p>

            {timer > 0 ? (
              <span className="text-gray-400 text-sm">
                Resend in {timer}s
              </span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="text-[#071074] text-sm font-medium hover:underline"
              >
                Resend OTP
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default VerfiyOtp;