import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoBagOutline } from "react-icons/io5";
import CountryDropDown from "../CountryDrop/CountryDropDown";
import { Button } from "@mui/material";
import { FiUser } from "react-icons/fi";
import { IoMdLogOut } from "react-icons/io";
import { FaRegHeart, FaUserCircle } from "react-icons/fa";
import { RiShoppingBag3Line } from "react-icons/ri";
import SearchBox from "./SearchBox";
import Navigations from "./Navigations";
import { MyContext } from "../../App";
import { IoIosMenu } from "react-icons/io";
import { fetchDataFromApi, formatCurrency } from "../../services/api";
import { MdKeyboardArrowRight, MdLaptopMac } from "react-icons/md";
import Swal from "sweetalert2";
import { useCart } from "../../context/CartContext";

function Header() {
  const context = useContext(MyContext);
  const navigate = useNavigate();
  const { totalItems, totalPrice } = useCart();
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const menuRef = useRef(null);

  // User dropdown menu
  const [anchorEl, setAnchorEl] = useState(null);
  const openUserMenu = Boolean(anchorEl);

  const handleUserMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle logout
  const handleLogout = () => {
    handleUserMenuClose();

    Swal.fire({
      title: "Logout",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#2bbef9",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        context.logout();
        Swal.fire({
          icon: "success",
          title: "Logged out",
          text: "You have been logged out successfully",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          navigate("/");
        });
      }
    });
  };

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetchDataFromApi("/api/category");
        const data = response.data || response?.data?.data || [];
        const mappedCategories = data.map((category) => {
          const subCategories = category.subcategories.map((sub) => ({
            icon: <MdLaptopMac />,
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

  // Check if the user is logged in
  const isLoggedIn = context.isLogin && context.user !== null;

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

  // User menu component - Custom dropdown below user button
  const UserMenu = () => (
    <>
      {openUserMenu && (
        <>
          {/* Overlay to close menu when clicking outside */}
          <div className="fixed inset-0 z-40" onClick={handleUserMenuClose} />
          {/* Dropdown Menu */}
          <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden animate-fadeIn">
            {/* User Info Header */}
            <div className="px-4 py-3 bg-gradient-to-r from-[#2bbef9] to-[#764ba2]">
              <p className="text-sm font-semibold text-white">
                {context.user?.name || "User"}
              </p>
              <p className="text-xs text-white/80 truncate">
                {context.user?.email || ""}
              </p>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              <button
                onClick={() => {
                  handleUserMenuClose();
                  navigate("/profile");
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <FaUserCircle size={18} className="text-gray-500" />
                <span className="text-sm">My Profile</span>
              </button>

              <button
                onClick={() => {
                  handleUserMenuClose();
                  navigate("/profile?tab=orders");
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <RiShoppingBag3Line size={18} className="text-gray-500" />
                <span className="text-sm">My Orders</span>
              </button>

              <button
                onClick={() => {
                  handleUserMenuClose();
                  navigate("/profile?tab=wishlist");
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <FaRegHeart size={18} className="text-gray-500" />
                <span className="text-sm">Wishlist</span>
              </button>

              {/* Divider */}
              <div className="my-2 border-t border-gray-100" />

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-red-500 hover:bg-red-50 transition-colors"
              >
                <IoMdLogOut size={18} />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );

  // Logged in user button component
  const LoggedInUserButton = ({ isMobile = false }) => (
    <div className="relative">
      <Button
        onClick={handleUserMenuClick}
        className="flex items-center gap-2"
        style={{
          borderRadius: isMobile ? "50%" : "25px",
          border: "1px solid #e0e0e0",
          minWidth: isMobile ? "45px" : "auto",
          padding: isMobile ? "8px" : "6px 12px",
          textTransform: "none",
          backgroundColor: "#f8fafc",
        }}
      >
        {context.user?.avatar ? (
          <img
            src={context.user.avatar}
            alt={context.user.name}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#2bbef9] to-[#764ba2] flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {context.user?.name?.charAt(0).toUpperCase() || "U"}
            </span>
          </div>
        )}
        {!isMobile && (
          <span className="text-gray-700 font-medium text-sm max-w-[100px] truncate">
            {context.user?.name?.split(" ")[0] || "User"}
          </span>
        )}
      </Button>
      <UserMenu />
    </div>
  );

  // Sign in button component
  const SignInButton = () => (
    <Link to="/signIn">
      <button className="flex whitespace-nowrap items-center gap-2 px-4 py-2 border border-[#2bbef9] rounded-lg text-[#2bbef9] font-medium hover:shadow-lg hover:bg-[#2bbef9] hover:text-white transition-all duration-300">
        <FiUser size={18} />
        <span>Sign In</span>
      </button>
    </Link>
  );

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
          <div className="max-w-[1200px] mx-auto">
            {/* Mobile Layout (<748px) */}
            <div className="flex lg:hidden items-center justify-between mb-3 relative">
              <Button className="menu-btn" onClick={handleCategoryClick}>
                <IoIosMenu size={24} />
              </Button>
              {showCategoryMenu && (
                <div
                  ref={menuRef}
                  className="absolute top-[100%] left-0 w-[20%] bg-white shadow-xl rounded-2xl px-4 py-3 z-50 border border-gray-100"
                  style={{ zIndex: 1000 }}
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
                                <span className="text-lg">📦</span>
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
                {/* User Icon - Mobile */}
                {isLoggedIn ? (
                  <LoggedInUserButton isMobile={true} />
                ) : (
                  <Link to="/signIn">
                    <Button
                      className="h-[44px]"
                      style={{
                        borderRadius: "50%",
                        border: "1px solid #e0e0e0",
                        minWidth: "45px",
                      }}
                    >
                      <FiUser color="#2bbef9" size={22} />
                    </Button>
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
                      }}
                    >
                      <IoBagOutline color="#ea2b0f" size={20} />
                      {totalItems > 0 && (
                        <span
                          className="absolute -top-1 -right-1 flex items-center justify-center bg-[#ea2b0f] text-white w-[18px] h-[18px] text-[11px]"
                          style={{ borderRadius: "50%" }}
                        >
                          {totalItems > 99 ? "99+" : totalItems}
                        </span>
                      )}
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
              <div className="flex items-center gap-3 md:gap-4 relative z-10">
                {/* User Section - Desktop */}
                {isLoggedIn ? (
                  <LoggedInUserButton isMobile={false} />
                ) : (
                  <SignInButton />
                )}

                {/* Cart Total */}
                <span className="text-[15px] font-medium text-gray-700">
                  {formatCurrency(totalPrice)}
                </span>

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
                      }}
                    >
                      <IoBagOutline color="#ea2b0f" size={20} />
                      {totalItems > 0 && (
                        <span
                          className="absolute -top-1 -right-1 flex items-center justify-center bg-[#ea2b0f] text-white w-[18px] h-[18px] text-[11px]"
                          style={{ borderRadius: "50%" }}
                        >
                          {totalItems > 99 ? "99+" : totalItems}
                        </span>
                      )}
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
