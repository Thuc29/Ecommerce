import React, { useState, useEffect } from "react";
import { Button, Col, Container, Navbar, Row } from "react-bootstrap";
import { MdKeyboardArrowRight, MdLaptopMac, MdHome } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import axios from "axios";

function Navigations() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8888/api/category");
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const showCategories = !isScrolled || windowWidth < 768;

  const handleCategoryClick = () => {
    setShowCategoryMenu(!showCategoryMenu);
  };

  return (
    <Navbar className="relative w-full bg-white">
      <Container className="max-w-[1280px] mx-auto lg:px-7 md:px-5 px-7">
        <div className="flex flex-col md:flex-row w-full items-center gap-3 md:gap-5">
          {showCategories && (
            <div className="w-full md:w-auto lg:w-auto ">
              <Button
                className="hover:bg-[#2bbef9] bg-[#2bbef9] w-full lg:block hidden"
                style={{
                  borderRadius: "30px",
                  color: "#fff",
                  padding: "8px 16px",
                }}
                onClick={handleCategoryClick}
              >
                <span className="font-medium flex items-center gap-2 justify-center text-[14px]">
                  <IoIosMenu size={20} /> Categories{" "}
                  <MdKeyboardArrowRight
                    size={14}
                    className={`transition-transform duration-200 ${
                      showCategoryMenu ? "rotate-180" : ""
                    }`}
                  />
                </span>
              </Button>
              {showCategoryMenu && (
                <div className="absolute top-[100%] min-w-[220px] bg-white shadow-xl rounded-2xl px-4 py-3 z-50 border border-gray-100">
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
            </div>
          )}

          <div
            className="w-full overflow-x-auto scrollbar-hide lg:pl-[10%] [&::-webkit-scrollbar]:h-1
  [&::-webkit-scrollbar-thumb]:rounded-xl
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-300"
          >
            <ul className="flex items-center justify-center md:justify-start gap-6 md:gap-8 py-2 min-w-max">
              <li className="whitespace-nowrap relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-[#2bbef9] after:left-0 after:bottom-[-4px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">
                <Link
                  to="/"
                  className="text-black font-medium text-[14px] uppercase hover:text-[#2bbef9] transition-colors relative"
                >
                  <MdHome size={16} className="inline-block mr-1" /> HOME
                </Link>
              </li>

              {loading && <li className="text-gray-600">Loading...</li>}
              {error && <li className="text-red-500">{error}</li>}
              {!loading &&
                !error &&
                categories.map((category) => (
                  <li key={category._id["$oid"]} className="w-auto group">
                    <Link
                      to="/"
                      className="text-black font-medium text-[14px] uppercase hover:text-[#2bbef9] transition-colors relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-[#2bbef9] after:left-0 after:bottom-[-4px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left flex items-center gap-1"
                    >
                      {category.images && category.images.length > 0 ? (
                        <img
                          src={category.images[0]}
                          alt={category.name}
                          className="w-4 h-4 object-contain inline-block mr-1"
                        />
                      ) : (
                        <span className="text-[16px] inline-block mr-1">
                          📦
                        </span>
                      )}
                      {category.name.toUpperCase()}
                      <MdKeyboardArrowRight
                        size={14}
                        className="transition-transform duration-200 group-hover:rotate-180"
                      />
                    </Link>
                    <div className="absolute top-[100%] min-w-[220px] bg-white shadow-xl rounded-xl p-5 opacity-0 invisible transform translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-in-out z-50 border border-gray-100">
                      {category.subCategories.map((subCategory) => (
                        <Link
                          key={
                            subCategory._id
                              ? subCategory._id["$oid"]
                              : subCategory.label
                          }
                          to="/"
                          className="block py-1 px-4 text-[14px] text-gray-800 hover:text-[#2bbef9] hover:bg-[#f0faff] rounded-lg transition-all duration-200 mb-2 last:mb-0 relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-[#2bbef9] after:left-0 after:bottom-[-4px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
                        >
                          <Button className="w-full text-left flex items-center gap-2">
                            <span className="text-[16px]">
                              {subCategory.icon}
                            </span>
                            {subCategory.label}
                          </Button>
                        </Link>
                      ))}
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </Container>
    </Navbar>
  );
}

export default Navigations;
