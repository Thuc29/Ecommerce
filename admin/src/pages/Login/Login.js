import React, { useState } from "react";
import {
  MdEmail,
  MdLock,
  MdOutlineFacebook,
  MdOutlineMailOutline,
  MdVerifiedUser,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { useTheme } from "../../components/Theme/ThemeContext";
function Login() {
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setTimeout(() => setIsFocused(false), 100);
  };
  return (
    <>
      <div
        className="flex flex-col items-center justify-center min-h-screen"
        style={{ backgroundImage: "url('/assets/images/crossline-dots.webp')" }}
      >
        <div className="text-center mb-6 flex flex-col items-center">
          <Link to={"/"}>
            <div className="flex justify-center">
              <img
                src="/assets/images/logoAdmin.png"
                alt="Logo"
                className="w-[20%] h-[20%]"
              />
            </div>
          </Link>
          <h2 className="!text-black text-2xl font-semibold mt-2">
            Login to Hotash
          </h2>
        </div>
        <div
          className={`p-8 !rounded-lg  !text-gray-700 border !border-gray-400 !w-full !max-w-sm ${
            theme === "light" ? "!bg-[#e9e8e8]" : "!bg-gray-800"
          }`}
        >
          <form className="space-y-4 ">
            <div className="relative">
              <MdEmail className="absolute left-2 top-2 text-gray-500 text-[20px]" />
              <input
                type="email"
                placeholder="Enter your email"
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none ${
                  theme === "dark"
                    ? "bg-gray-700 border-gray-500 text-white"
                    : "bg-gray-100 border-gray-300"
                }`}
              />
            </div>
            <div className="relative flex">
              <MdLock className="absolute left-2 top-2 text-gray-500 text-[20px]" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none ${
                  theme === "dark"
                    ? "bg-gray-700 border-gray-500 text-white"
                    : "bg-gray-100 border-gray-300"
                }`}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-2 focus:outline-none transition-transform duration-200 ease-in-out transform hover:scale-110"
              >
                {showPassword ? (
                  <MdVisibilityOff className="text-gray-400 text-[20px]" />
                ) : (
                  <MdVisibility className="text-gray-400 text-[20px]" />
                )}
              </button>
            </div>

            <div className="relative">
              <MdVerifiedUser className=" absolute left-2 top-2 text-gray-500 text-[20px] focus:ring-2 focus:ring-blue-500" />
              <select
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  theme === "dark"
                    ? "bg-gray-700 border-gray-500 text-white"
                    : "bg-gray-100 border-gray-300"
                }`}
              >
                <option>Select Option</option>
                <option>Admin</option>
                <option>Members</option>
                <option>Client</option>
                <option>Manager</option>
                <option>Vendor</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              SIGN IN
            </button>
          </form>
          <div className="text-center mt-2 ">
            <Link
              to={"/forgotpassword"}
              className="text-gray-500 text-sm hover:text-blue-500"
            >
              FORGOT PASSWORD
            </Link>
          </div>
          <div className="flex items-center my-3">
            <hr className="flex-grow border-gray-300" />
            <span
              className={`px-4 py-3 border-2 border-gray-300 rounded-full text-gray-500 ${
                theme === "dark" ? "text-gray-300" : "text-gray-500"
              }`}
            >
              or
            </span>
            <hr className="flex-grow border-gray-300" />
          </div>
          <div className="space-y-4">
            <button className="w-full bg-red-500 text-white py-2 rounded-lg flex items-center justify-center hover:bg-blue-600 transition duration-200">
              <MdOutlineMailOutline size={20} className="mr-3" /> Continue with
              Email
            </button>
            <button className="w-full bg-blue-800 text-white py-2 rounded-lg flex items-center justify-center hover:bg-blue-900 transition duration-200">
              <MdOutlineFacebook size={20} className="mr-3" /> Continue with
              Facebook
            </button>
          </div>
        </div>
        <div
          className={` mt-4 p-3 rounded-lg text-center  border border-gray-400 w-full max-w-sm ${
            theme === "dark" ? "bg-gray-700 " : "!bg-[#e9e8e8] "
          }`}
        >
          <span
            className={`${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Don't have an account?{" "}
          </span>
          <Link to={"/signup"} className="text-blue-500 hover:font-semibold">
            Register
          </Link>
        </div>
      </div>
    </>
  );
}

export default Login;
