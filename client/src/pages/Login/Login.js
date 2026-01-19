import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postDataToApi } from "../../services/api";
import Swal from "sweetalert2";
import { MyContext } from "../../App";

const AuthForm = () => {
  const navigate = useNavigate();
  const context = useContext(MyContext);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // OTP verification states
  const [showOTPForm, setShowOTPForm] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpTimer, setOtpTimer] = useState(0);
  const otpInputRefs = useRef([]);

  // Sign In form state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Sign Up form state
  const [registerData, setRegisterData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  // Timer countdown for OTP resend
  useEffect(() => {
    let interval;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  // Handle Sign In input change
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Sign Up input change
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  // Handle OTP paste
  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);

    // Focus the next empty input or the last one
    const nextEmptyIndex = newOtp.findIndex((val) => !val);
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    otpInputRefs.current[focusIndex]?.focus();
  };

  // Handle OTP key down (for backspace)
  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  // Handle Sign In submit
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please enter both email and password",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await postDataToApi(
        "/api/users/login",
        loginData,
        false
      );

      if (response.success) {
        // Use context login function
        context.login(response.data.user, response.data.token);

        Swal.fire({
          icon: "success",
          title: "Welcome back!",
          text: `Hello, ${response.data.user.name}!`,
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          navigate("/");
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message || "Invalid email or password",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Validate registration data
  const validateRegisterData = () => {
    if (
      !registerData.name ||
      !registerData.phone ||
      !registerData.email ||
      !registerData.password
    ) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please fill in all fields",
      });
      return false;
    }

    if (registerData.password.length < 6) {
      Swal.fire({
        icon: "warning",
        title: "Weak Password",
        text: "Password must be at least 6 characters",
      });
      return false;
    }

    const phoneRegex = /^(\+84|0)[0-9]{9,10}$/;
    if (!phoneRegex.test(registerData.phone)) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Phone Number",
        text: "Please enter a valid phone number (e.g., 0901234567)",
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerData.email)) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Email",
        text: "Please enter a valid email address",
      });
      return false;
    }

    return true;
  };

  // Send OTP for registration
  const handleSendOTP = async (e) => {
    e.preventDefault();

    if (!validateRegisterData()) return;

    setIsLoading(true);
    try {
      const response = await postDataToApi(
        "/api/users/send-otp",
        {
          email: registerData.email,
          name: registerData.name,
          type: "register",
        },
        false
      );

      if (response.success) {
        setShowOTPForm(true);
        setOtpTimer(300); // 5 minutes countdown
        setOtp(["", "", "", "", "", ""]);

        Swal.fire({
          icon: "success",
          title: "OTP Sent!",
          text: `We've sent a verification code to ${registerData.email}`,
          timer: 2000,
          showConfirmButton: false,
        });

        // Focus first OTP input
        setTimeout(() => {
          otpInputRefs.current[0]?.focus();
        }, 100);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to Send OTP",
        text: error.message || "Please try again",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    if (otpTimer > 0) return;

    setIsLoading(true);
    try {
      const response = await postDataToApi(
        "/api/users/resend-otp",
        {
          email: registerData.email,
          name: registerData.name,
          type: "register",
        },
        false
      );

      if (response.success) {
        setOtpTimer(300);
        setOtp(["", "", "", "", "", ""]);

        Swal.fire({
          icon: "success",
          title: "OTP Resent!",
          text: "Please check your email",
          timer: 1500,
          showConfirmButton: false,
        });

        otpInputRefs.current[0]?.focus();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to Resend OTP",
        text: error.message || "Please try again",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Verify OTP and complete registration
  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      Swal.fire({
        icon: "warning",
        title: "Invalid OTP",
        text: "Please enter the 6-digit code",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Register with OTP
      const response = await postDataToApi(
        "/api/users/register",
        {
          ...registerData,
          otp: otpCode,
        },
        false
      );

      if (response.success) {
        // Use context login function
        context.login(response.data.user, response.data.token);

        Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          text: "Welcome to our store!",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          navigate("/");
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Verification Failed",
        text: error.message || "Invalid or expired OTP",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Go back from OTP form
  const handleBackFromOTP = () => {
    setShowOTPForm(false);
    setOtp(["", "", "", "", "", ""]);
    setOtpTimer(0);
  };

  // Format timer display
  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Reset forms when switching
  const switchToSignUp = () => {
    setLoginData({ email: "", password: "" });
    setShowOTPForm(false);
    setOtp(["", "", "", "", "", ""]);
    setIsSignUp(true);
  };

  const switchToSignIn = () => {
    setRegisterData({ name: "", phone: "", email: "", password: "" });
    setShowOTPForm(false);
    setOtp(["", "", "", "", "", ""]);
    setIsSignUp(false);
  };

  return (
    <div className="items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-center py-10">
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
          <form onSubmit={handleLogin} className="w-full">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              Sign In
            </h2>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={loginData.email}
              onChange={handleLoginChange}
              className="w-full px-4 py-2 mb-4 border-b-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-purple-400 transition-all"
              disabled={isLoading}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleLoginChange}
              className="w-full px-4 py-2 border-b-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-sky-500 transition-all"
              disabled={isLoading}
            />
            <div className="text-end">
              <Link
                href="#"
                className="text-sm text-[#2bbef9] hover:underline mt-0"
              >
                Forgot your password?
              </Link>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="btn mt-6 px-6 py-2 bg-gradient-to-r hover:from-cyan-400 hover:to-blue from-sky-400 to-purple-400 text-white font-semibold rounded-lg shadow-lg shadow-gray-500 hover:bg-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>

        {/* Form Sign Up - Step 1: Registration Info */}
        <div
          className={`absolute top-0 left-0 w-1/2 h-full px-10 py-8 flex flex-col justify-center items-center transition-all duration-700 ease-in-out ${
            isSignUp && !showOTPForm
              ? "opacity-100 z-10 translate-x-0"
              : "translate-x-full opacity-0 z-0"
          }`}
        >
          <form onSubmit={handleSendOTP} className="w-full">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Create Account
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Fill in your details to receive a verification code
            </p>
            <div className="flex space-x-2">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={registerData.name}
                onChange={handleRegisterChange}
                className="w-full px-4 py-2 mb-3 border-b-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all"
                disabled={isLoading}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={registerData.password}
                onChange={handleRegisterChange}
                className="w-full px-4 py-2 mb-3 border-b-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all"
                disabled={isLoading}
              />
            </div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone (e.g., 0901234567)"
              value={registerData.phone}
              onChange={handleRegisterChange}
              className="w-full px-4 py-2 mb-3 border-b-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all"
              disabled={isLoading}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={registerData.email}
              onChange={handleRegisterChange}
              className="w-full px-4 py-2 mb-3 border-b-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="btn mt-4 px-6 py-2 w-full bg-gradient-to-r from-pink-300 to-pink-500 hover:from-sky-400 hover:to-purple-400 text-white font-semibold rounded-lg shadow-lg shadow-gray-500 hover:bg-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Sending OTP..." : "Send Verification Code"}
            </button>
          </form>
        </div>

        {/* Form Sign Up - Step 2: OTP Verification */}
        <div
          className={`absolute top-0 left-0 w-1/2 h-full px-10 py-8 flex flex-col justify-center items-center transition-all duration-700 ease-in-out ${
            isSignUp && showOTPForm
              ? "opacity-100 z-10 translate-x-0"
              : "translate-x-full opacity-0 z-0"
          }`}
        >
          <form onSubmit={handleVerifyOTP} className="w-full">
            <button
              type="button"
              onClick={handleBackFromOTP}
              className="mb-2 text-sm text-gray-500 hover:text-gray-700 flex items-center"
            >
              ← Back
            </button>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              Verify Email
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Enter the 6-digit code sent to
              <br />
              <span className="font-medium text-pink-500">
                {registerData.email}
              </span>
            </p>

            {/* OTP Input Fields */}
            <div className="flex justify-center gap-2 mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (otpInputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  onPaste={handleOtpPaste}
                  className="w-10 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all"
                  disabled={isLoading}
                />
              ))}
            </div>

            {/* Timer and Resend */}
            <div className="text-center mb-4">
              {otpTimer > 0 ? (
                <p className="text-sm text-gray-500">
                  Code expires in{" "}
                  <span className="font-medium text-pink-500">
                    {formatTimer(otpTimer)}
                  </span>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={isLoading}
                  className="text-sm text-[#2bbef9] hover:underline disabled:opacity-50"
                >
                  Resend Code
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || otp.join("").length !== 6}
              className="btn px-6 py-2 w-full bg-gradient-to-r from-pink-300 to-pink-500 hover:from-sky-400 hover:to-purple-400 text-white font-semibold rounded-lg shadow-lg shadow-gray-500 hover:bg-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Verifying..." : "Verify & Create Account"}
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
                  onClick={switchToSignIn}
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
                  onClick={switchToSignUp}
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
