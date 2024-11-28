import React, { useContext } from "react";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoBagOutline } from "react-icons/io5";
import CountryDropDown from "../CountryDrop/CountryDropDown";
import { Button } from "@mui/material";
import { FiUser } from "react-icons/fi";
import SearchBox from "./SearchBox";
import Navigations from "./Navigations";
import { MyContext } from "../../App";
import { IoIosMenu } from "react-icons/io";

function Header() {
  const context = useContext(MyContext);

  // Check if the user is logged in (assuming context contains user data)
  const isLoggedIn = context.user !== null;

  return (
    <div className="headerWrapper w-full h-auto border-b border-gray-200 pb-2">
      <div className="topHeader bg-[#2bbef9]">
        <p className="mb-0 py-2 text-center text-white text-sm font-medium">
          Due to the <strong>COVID-19</strong> pandemic, orders may be processed
          with a slight delay
        </p>
      </div>
      <header className="mainHeader w-full h-auto md:py-4 bg-white rounded-md mx-auto max-w-screen-xl">
        <div className="px-4 md:px-6">
          <div className="max-w-[1440px] mx-auto">
            {/* Mobile Layout (<748px) */}
            <div className="flex lg:hidden items-center justify-between mb-3">
              <Button className="menu-btn">
                <IoIosMenu size={24} />
              </Button>
              <Link to="/" className="w-[120px]">
                <img
                  src="../assets/logo_ecommerce.png"
                  alt="E-commerce Logo"
                  className="w-full"
                />
              </Link>
              <div className="flex items-center gap-2 md:gap-4 relative z-10">
                {/* User Icon */}
                {isLoggedIn ? (
                  <Link to="/signin">
                    <button
                      className="p-2 border rounded-lg text-[#2bbef9] font-medium hover:shadow-lg hover:bg-[#2bbef9] hover:text-white"
                      style={{ zIndex: 10 }} // Ensures button is above other elements
                    >
                      Sign In
                    </button>
                  </Link>
                ) : (
                  <Button
                    className="h-[44px] relative"
                    style={{
                      borderRadius: "50%",
                      border: "1px solid #e0e0e0",
                      minWidth: "45px",
                      zIndex: 10, // Ensures button is above other elements
                    }}
                  >
                    <FiUser color="#000" size={22} />
                  </Button>
                )}
                {/* Cart Icon */}
                <div className="relative">
                  <Link to={`/cart`}>
                    <Button
                      className="h-[44px] relative"
                      style={{
                        borderRadius: "50%",
                        border: "1px solid #e0e0e0",
                        backgroundColor: "#fff1ee",
                        minWidth: "45px",
                        zIndex: 10, // Ensures button is above other elements
                      }}
                    >
                      <IoBagOutline color="#ea2b0f" size={20} />
                      <span
                        className="absolute -top-1 -right-1 flex items-center justify-center bg-[#ea2b0f] text-white w-[18px] h-[18px] text-[11px]"
                        style={{ borderRadius: "50%" }}
                      >
                        1
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Desktop Layout (≥748px) */}
            <div className="hidden lg:flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Logo */}
              <div className="w-[120px] md:w-[140px] mb-3 md:mb-0">
                <Link to="/">
                  <img
                    src="../assets/logo_ecommerce.png"
                    alt="E-commerce Logo"
                    className="w-full"
                  />
                </Link>
              </div>

              {/* Country Dropdown - Hidden on mobile */}
              <div className="hidden md:block">
                {context.countryList.length !== 0 && <CountryDropDown />}
              </div>

              {/* Search Bar */}
              <SearchBox />

              {/* User and Cart */}
              <div className="flex items-center gap-2 md:gap-4 relative z-10">
                {/* User Icon */}
                {isLoggedIn ? (
                  <Link to="/signin">
                    <button
                      className="p-2 border rounded-lg text-[#2bbef9] font-medium hover:shadow-lg hover:bg-[#2bbef9] hover:text-white"
                      style={{ zIndex: 10 }} // Ensures button is above other elements
                    >
                      Sign In
                    </button>
                  </Link>
                ) : (
                  <Button
                    className="h-[44px] relative"
                    style={{
                      borderRadius: "50%",
                      border: "1px solid #e0e0e0",
                      minWidth: "45px",
                      zIndex: 10, // Ensures button is above other elements
                    }}
                  >
                    <FiUser color="#000" size={22} />
                  </Button>
                )}
                <span className="text-[15px] font-medium">$4.00</span>

                {/* Cart Icon */}
                <div className="relative">
                  <Link to={`/cart`}>
                    <Button
                      className="h-[44px] relative"
                      style={{
                        borderRadius: "50%",
                        border: "1px solid #e0e0e0",
                        backgroundColor: "#fff1ee",
                        minWidth: "45px",
                        zIndex: 10, // Ensures button is above other elements
                      }}
                    >
                      <IoBagOutline color="#ea2b0f" size={20} />
                      <span
                        className="absolute -top-1 -right-1 flex items-center justify-center bg-[#ea2b0f] text-white w-[18px] h-[18px] text-[11px]"
                        style={{ borderRadius: "50%" }}
                      >
                        1
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Search Box for Mobile */}
      <div className="md:hidden px-4 mb-3">
        <SearchBox />
      </div>

      <Navigations />
    </div>
  );
}

export default Header;
