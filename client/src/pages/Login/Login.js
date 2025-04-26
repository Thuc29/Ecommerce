import React, { useState } from "react";

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className=" items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% to-pink-500 text-center py-10">
      <p className="font-extrabold text-[26px] text-white mb-6">
        How are you today?
      </p>
      <div className="relative mx-auto w-full max-w-[768px] h-[500px] bg-white rounded-xl shadow-2xl overflow-hidden">
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
              className="w-full px-4 py-2 mb-4 border-b-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-purple-400 transition-all"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border-b-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-sky-500 transition-all"
            />
            <div className="text-end">
              <a
                href="#"
                className="text-sm text-[#2bbef9] hover:underline mt-0"
              >
                Forgot your password?
              </a>
            </div>
            <button className="btn mt-6 px-6 py-2 bg-gradient-to-r hover:from-cyan-400 hover:to-blue from-sky-400 to-purple-400 text-white font-semibold rounded-lg shadow-lg shadow-gray-500 hover:bg-purple-600 transition-all">
              Sign In
            </button>
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
                className="w-full px-4 py-2 mb-4 border-b-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 mb-4 border-b-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all"
              />
            </div>
            <input
              type="number"
              placeholder="Phone"
              className="w-full px-4 py-2 mb-4 border-b-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 mb-4 border-b-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all"
            />
            <button className="btn mt-6 px-6 py-2 bg-gradient-to-r from-pink-300 to-pink-500 hoverfrom-sky-400 hover:to-purple-400 text-white font-semibold rounded-lg shadow-lg shadow-gray-500 hover:bg-purple-600 transition-all">
              Sign Up
            </button>
          </form>
        </div>

        {/* Overlay Panel */}
        <div
          className={`absolute top-0 w-1/2 h-full text-white flex items-center justify-center transition-transform duration-700 ease-in-out ${
            isSignUp ? "right-0" : "left-0"
          }`}
        >
          {/* Overlay Background with Animation */}
          <div
            className={`absolute inset-0 bg-cover bg-center rounded-xl transition-all duration-700 ease-in-out ${
              isSignUp
                ? "translate-x-0 opacity-100 "
                : "-translate-x-0 opacity-100"
            }`}
            style={{
              backgroundImage:
                "url('https://c4.wallpaperflare.com/wallpaper/1020/112/952/black-tree-beside-green-field-under-a-cloudy-sky-wallpaper-preview.jpg')",
              filter: "blur(2px)",
            }}
          ></div>

          {/* Hover Effect for Text */}
          <div
            className={`absolute inset-0 via-transparent transition-opacity duration-500 ease-in-out hover:opacity-10`}
          ></div>

          {/* Text Content */}
          <div className="relative z-10 text-center px-6 group">
            {isSignUp ? (
              <>
                <h3 className="text-2xl font-bold transition-all duration-300 group-hover:text-blue">
                  Welcome Back!
                </h3>
                <p className="text-sm mt-4 transition-all duration-300 group-hover:text-blue">
                  Sign in to continue exploring new opportunities!
                </p>
                <button
                  className="mt-6 px-6 py-2 bg-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:bg-[#2bbef9] text-[#2bbef9] hover:text-white transition-all"
                  onClick={() => setIsSignUp(false)}
                >
                  Sign In
                </button>
              </>
            ) : (
              <>
                <h3 className="text-2xl font-bold transition-all duration-300 group-hover:text-pink-400">
                  New Here?
                </h3>
                <p className="text-sm mt-4 transition-all duration-300 group-hover:text-pink-400">
                  Create an account to start your journey with us!
                </p>
                <button
                  className="mt-6 px-6 py-2 bg-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:bg-pink-500 text-pink-500 hover:text-white transition-all"
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
