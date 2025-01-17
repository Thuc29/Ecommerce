import React, { useState } from "react";
import {
  MdAccountCircle,
  MdEmail,
  MdHome,
  MdLock,
  MdOutlineEmail,
  MdOutlineFacebook,
  MdVerifiedUser,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { useTheme } from "../../components/Theme/ThemeContext";

function Register() {
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <>
      <div
        className={`min-h-screen flex items-center justify-center ${
          theme === "light" ? "!bg-gray-100" : "!bg-gray-800"
        }`}
        style={{ backgroundImage: "url('/assets/images/crossline-dots.webp')" }}
      >
        <div
          className={` border shadow-2xl rounded-lg flex max-w-6xl w-full ${
            theme === "light" ? "!bg-gray-100" : "!bg-gray-800"
          }`}
        >
          <div className="w-2/3 my-auto p-10 bg-gray-100 hidden md:block">
            <h1 className="!text-[45px] !leading-[3rem] !font-black !text-gray-800 !mb-2">
              BEST UX/UI FASHION
              <b className="bg-gradient-to-l from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-gray-800">
                {" "}
                ECOMMERCE DASHBOARD
              </b>{" "}
              & ADMIN PANEL
            </h1>
            <p className="text-gray-600 text-[17px] mb-6">
              Elit lusto dolore libero recusandae dolor dolores explicabo ullam
              cum facilis aperiam alias odio quam excepturi molestiae omnis
              inventore. Repudiandae officia placeat amet consectetur dicta
              dolorem quo
            </p>
            <Link to={"/"}>
              <button className="bg-blue-700 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-full flex items-center">
                <MdHome size={20} className="mr-2" /> GO TO HOME
              </button>
            </Link>
          </div>
          <div
            className={`md:w-1/3 !bg-[#e9e8e8] border p-10 ${
              theme === "light" ? "!bg-gray-100" : "!bg-gray-800"
            }`}
          >
            <Link to={"/"}>
              <div className="flex justify-center mb-2">
                <img
                  src="/assets/images/logoAdmin.png"
                  alt="Logo"
                  className="w-[20%] h-[20%]"
                />
              </div>
            </Link>
            <h2
              className={`text-xl font-semibold  mb-6 !text-center ${
                theme === "light" ? "!text-gray-800" : "!text-gray-50"
              }`}
            >
              Register a new account
            </h2>
            <form className="space-y-4">
              <div className="relative">
                <MdAccountCircle className="absolute left-2 top-2 text-gray-500 text-[20px]" />
                <input
                  type="text"
                  placeholder="Enter your name"
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-500 text-white"
                      : "bg-gray-100 border-gray-300"
                  }`}
                />
              </div>
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
              <div className="relative flex mb-4">
                <MdLock className="absolute left-2 top-2 text-gray-500 text-[20px]" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-500 text-white"
                      : "bg-gray-100 border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-2 focus:outline-none"
                >
                  {showPassword ? (
                    <MdVisibilityOff className="text-gray-500 text-[20px] cursor-pointer" />
                  ) : (
                    <MdVisibility className="text-gray-500 text-[20px] cursor-pointer" />
                  )}
                </button>
              </div>

              <div className="relative flex">
                <MdVerifiedUser className="absolute left-2 top-2 text-gray-500 text-[20px]" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-500 text-white"
                      : "bg-gray-100 border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-3 top-2 focus:outline-none"
                >
                  {showConfirmPassword ? (
                    <MdVisibilityOff className="text-gray-500 text-[20px] cursor-pointer hover:text-gray-700" />
                  ) : (
                    <MdVisibility className="text-gray-500 text-[20px] cursor-pointer hover:text-gray-700" />
                  )}
                </button>
              </div>

              <div className="mb-4">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-gray-600">
                    I agree to all Terms & Conditions
                  </span>
                </label>
              </div>
              <button
                type="submit"
                className={`w-full py-2 rounded-lg transition duration-200 ${
                  theme === "dark"
                    ? "bg-blue-600 hover:bg-blue-500 text-white"
                    : "bg-blue-700 hover:bg-blue-500 text-white"
                }`}
              >
                SIGN UP
              </button>
              <div className="flex items-center my-4">
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
              <button className="bg-[#d93025] text-white w-full py-3 rounded-lg mb-4 flex items-center justify-center">
                <MdOutlineEmail size={20} className="mr-3" /> Continue with
                Gmail
              </button>
              <button className="bg-[#3b5998]  text-white w-full py-3 rounded-lg mb-4 flex items-center justify-center">
                <MdOutlineFacebook size={20} className="mr-3" /> Continue with
                Facebook
              </button>
            </form>
            <div className="text-center mt-4">
              <span
                className={`${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Already have an account?{" "}
              </span>
              <Link to={"/login"} className="text-blue-500 hover:font-semibold">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
