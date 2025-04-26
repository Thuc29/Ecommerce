import React from "react";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { useTheme } from "../../components/Theme/ThemeContext";

function ForgotPassword() {
  const { theme } = useTheme();
  return (
    <>
      <div
        className="flex flex-col items-center  min-h-screen"
        style={{ backgroundImage: "url('/assets/images/crossline-dots.webp')" }}
      >
        <div className="text-center mb-2">
          <Link to={"/"}>
            {" "}
            <img
              src="/assets/images/logoAdmin.png"
              alt="Logo"
              className="mx-auto w-[15%] h-[15%] mb-2"
            />{" "}
          </Link>
          <h1 className="text-2xl !text-black font-semibold">
            Reset the password
          </h1>
        </div>
        <div
          className={`border border-gray-300 p-6 rounded-lg shadow-md w-full max-w-sm ${
            theme === "light" ? "!bg-[#e9e8e8]" : "!bg-gray-800"
          }`}
        >
          <div className="mb-4">
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
          </div>
          <button className="bg-blue-700  hover:bg-blue-500 text-white font-bold py-2 mb-4 px-4 rounded w-full">
            GET LINK
          </button>
        </div>
        <div
          className={` mt-4 p-5 rounded-lg text-center  border border-gray-400 w-full max-w-sm ${
            theme === "dark" ? "bg-gray-700 " : "!bg-[#e9e8e8] "
          }`}
        >
          {" "}
          <span
            className={`${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            remember the password?{" "}
            <Link to={"/login"} className="text-blue-500 hover:font-semibold">
              Login
            </Link>
          </span>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
