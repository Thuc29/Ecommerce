import React, { useState } from "react";

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className=" items-center text-center my-5 bg-gradient-to-br from-blue-500 to-green-400 drop-shadow-lg">
      <p className="font-extrabold text-[26px]"> How are you today? </p>
      <div className="relative mx-auto w-full max-w-[768px] h-[450px] bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Form Sign In */}
        <div
          className={`absolute inset-y-0 left-[50%] w-1/2 px-10 py-12 flex flex-col justify-center items-center transition-transform duration-700 ease-in-out ${
            isSignUp
              ? "-translate-x-full opacity-0"
              : "translate-x-0 opacity-100 z-10"
          }`}
        >
          <form onSubmit={(e) => e.preventDefault()} className="w-full">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              Sign In
            </h2>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 mb-4 border-b-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
            />{" "}
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2   border-b-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
            />
            <div className="text-end">
              {" "}
              <a
                href="#"
                className="text-sm text-blue-500 hover:underline mt-0"
              >
                Forgot your password?
              </a>
            </div>
            <div>
              {" "}
              <button className="btn mt-6 px-6 py-2 bg-white font-semibold rounded-lg shadow-md hover:shadow-[#2bbef9] hover:text-[#2bbef9]  transition-all">
                Sign In
              </button>
            </div>
          </form>
        </div>

        {/* Form Sign Up */}
        <div
          className={`absolute top-0 left-0 w-1/2 h-full px-10 py-12 flex flex-col justify-center items-center transition-all duration-700 ease-in-out ${
            isSignUp
              ? "opacity-100 z-10 translate-x-0"
              : "translate-x-full opacity-0 z-0"
          }`}
        >
          <form onSubmit={(e) => e.preventDefault()} className="w-full">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              Create Account
            </h2>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Username"
                className="w-full px-4 py-2 mb-4  border-b-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 mb-4  border-b-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
              />
            </div>

            <input
              type="number"
              placeholder="Phone"
              className="w-full px-4 py-2 mb-4  border-b-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 mb-4  border-b-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
            />
            <button className="btn mt-6 px-6 py-2 bg-white font-semibold rounded-lg shadow-md hover:shadow-[#2bbef9] hover:text-[#2bbef9]  transition-all">
              Sign Up
            </button>
          </form>
        </div>

        {/* Overlay Panel */}
        <div
          className={`absolute top-0 w-1/2 h-full bg-gradient-to-br from-blue-700 to-green-500 text-white flex items-center justify-center transition-transform duration-700 ease-in-out ${
            isSignUp ? "right-0" : "left-0"
          }`}
        >
          <div
            className={`absolute inset-0 bg-opacity-50 bg-cover bg-center rounded-xl transition-transform duration-700 ease-in-out ${
              isSignUp ? "transform translate-x-0" : "transform translate-x-0"
            }`}
            style={{
              backgroundImage:
                "url('https://c4.wallpaperflare.com/wallpaper/1020/112/952/black-tree-beside-green-field-under-a-cloudy-sky-wallpaper-preview.jpg')",
              filter: "blur(2px)",
            }}
          ></div>
          <div className="relative z-10 text-center px-6">
            {isSignUp ? (
              <>
                <h3 className="text-2xl font-bold shadow-lg shadow-[#2bbef9]">
                  Welcome Back!
                </h3>
                <p className="text-sm mt-4">
                  Sign in to continue exploring new opportunities!
                </p>
                <button
                  className="mt-6 px-6 py-2 bg-white font-semibold hover:text-white rounded-lg shadow-md hover:shadow-lg hover:bg-[#2bbef9] text-[#2bbef9] transition-all"
                  onClick={() => setIsSignUp(false)}
                >
                  Sign In
                </button>
              </>
            ) : (
              <>
                <h3 className="text-2xl font-bold shadow-lg shadow-[#2bbef9]">
                  New Here?
                </h3>
                <p className="text-sm mt-4">
                  Create an account to start your journey with us!
                </p>
                <button
                  className="mt-6 px-6 py-2 bg-white font-semibold hover:text-white rounded-lg shadow-md hover:shadow-lg hover:bg-[#2bbef9] text-[#2bbef9] transition-all"
                  onClick={() => setIsSignUp(true)}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
