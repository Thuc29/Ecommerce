import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { IoBagOutline } from "react-icons/io5";
import CountryDropDown from "../CountryDrop/CountryDropDown";
import { Button } from "@mui/material";
import { FiUser } from "react-icons/fi";
import SearchBox from "./SearchBox";
import Navigations from "./Navigations";
import { MyContext } from "../../App";
import { IoIosMenu } from "react-icons/io";
import axios from "axios";
import { MdKeyboardArrowRight, MdLaptopMac } from "react-icons/md";

function Header() {
  const context = useContext(MyContext);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const menuRef = useRef(null);

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://ecommerce-6ssp.onrender.com/api/category");
        const mappedCategories = response.data.data.map((category) => {
          const subCategories = category.subcategories.map((sub) => ({
            icon: <MdLaptopMac />, // Default icon for all subcategories
            label: sub.name || "No subcategories",
          }));
          return { ...category, subCategories };
        });
        setCategories(mappedCategories);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching categories:", err.message);
        setError("Failed to load categories");
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);
  // Check if the user is logged in (assuming context contains user data)
  const isLoggedIn = context.user !== null;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowCategoryMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleCategoryClick = () => {
    setShowCategoryMenu(!showCategoryMenu);
  };
  const handleLinkClick = () => {
    setShowCategoryMenu(false);
  };

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
            <div className="flex lg:hidden items-center justify-between mb-3 relative">
              <Button className="menu-btn" onClick={handleCategoryClick}>
                <IoIosMenu size={24} />
              </Button>
              {showCategoryMenu && (
                <div
                  ref={menuRef}
                  className="absolute top-[100%] left-0 w-[20%] bg-white shadow-xl rounded-2xl px-4 py-3 z-50 border border-gray-100"
                  style={{ zIndex: 1000 }} // Ensure menu is above other elements
                >
                  {loading && (
                    <p className="text-center text-gray-600">Loading...</p>
                  )}
                  {error && <p className="text-center text-red-500">{error}</p>}
                  {!loading &&
                    !error &&
                    categories.map((item) => (
                      <div
                        key={item._id["$oid"]}
                        className="group/item relative"
                      >
                        <Link
                          to="/"
                          onClick={handleLinkClick}
                          className="block text-[14px] text-gray-800 hover:text-[#2bbef9] hover:bg-[#f0faff] rounded-lg transition-all duration-200 mb-2 last:mb-0 relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-[#2bbef9] after:left-0 after:bottom-[-4px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
                        >
                          <span className="flex items-center justify-between">
                            <span className="flex items-center gap-2">
                              {item.images && item.images.length > 0 ? (
                                <img
                                  src={item.images[0]}
                                  alt={item.name}
                                  className="w-6 h-6 object-contain"
                                />
                              ) : (
                                <span className="text-lg">📦</span> // Fallback icon
                              )}
                              {item.name}
                            </span>
                            <MdKeyboardArrowRight
                              size={16}
                              className="transition-transform duration-200 group-hover/item:rotate-90"
                            />
                          </span>
                        </Link>

                        <div className="absolute left-full top-0 min-w-[200px] bg-white shadow-xl rounded-xl p-2 opacity-0 invisible transform translate-x-2 group-hover/item:opacity-100 group-hover/item:visible group-hover/item:translate-x-0 transition-all duration-200 ease-in-out z-50 border border-gray-100 ml-2">
                          {item.subCategories.map((subCategory) => (
                            <Link
                              key={
                                subCategory._id
                                  ? subCategory._id["$oid"]
                                  : subCategory.label
                              }
                              to="/"
                              onClick={handleLinkClick}
                              className="block p-1 text-[14px] text-gray-800 hover:text-[#2bbef9] hover:bg-[#f0faff] rounded-lg transition-all duration-200 mb-2 last:mb-0 relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-[#2bbef9] after:left-0 after:bottom-[-4px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
                            >
                              <span className="flex items-center gap-2">
                                <span className="text-[16px]">
                                  {subCategory.icon}
                                </span>
                                {subCategory.label}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              )}
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
                ) : (
                  <Link to="/signin">
                    <button
                      className="p-2 border rounded-lg text-[#2bbef9] font-medium hover:shadow-lg hover:bg-[#2bbef9] hover:text-white"
                      style={{ zIndex: 10 }} // Ensures button is above other elements
                    >
                      Sign In
                    </button>
                  </Link>
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
