import React, { useState, useEffect } from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { MdKeyboardArrowRight, MdLaptopMac, MdHome } from "react-icons/md";
import { Link, useParams, useLocation } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { fetchDataFromApi } from "../../services/api";

function Navigations() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Get current category from URL
  const { id: categoryIdFromParams } = useParams();
  const location = useLocation();
  
  // Determine active category - handle both /cat/:id and /products?category=:id
  const getActiveCategoryId = () => {
    if (categoryIdFromParams) return categoryIdFromParams;
    
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get("category") || null;
  };
  
  const activeCategoryId = getActiveCategoryId();

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
            _id: sub._id,
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

  // Check if is home page
  const isHomePage = location.pathname === "/" || location.pathname === "/home";

  return (
    <Navbar className="relative w-full bg-white overflow-visible">
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
                      showCategoryMenu ? "rotate-90" : ""
                    }`}
                  />
                </span>
              </Button>
              {showCategoryMenu && (
                <div className="absolute top-[100%] left-18 min-w-[260px] max-w-[300px] bg-white shadow-2xl rounded-2xl z-50 border border-gray-100 overflow-hidden">
                  <div className="max-h-[60vh] overflow-y-auto px-2 py-2">
                    {loading && (
                      <p className="text-center text-gray-600 py-2">
                        Loading...
                      </p>
                    )}
                    {error && (
                      <p className="text-center text-red-500 py-2">{error}</p>
                    )}
                    {!loading &&
                      !error &&
                      categories.map((item) => {
                        const isActive = activeCategoryId === item._id;
                        return (
                          <div
                            key={item._id}
                            className="group/item relative"
                          >
                            <Link
                              to={`/cat/${item._id}`}
                              onClick={() => setShowCategoryMenu(false)}
                              className={`flex items-center justify-between gap-2 text-[14px] rounded-xl transition-all duration-200 mb-1 last:mb-0 px-3 py-2 ${
                                isActive
                                  ? "bg-[#2bbef9] text-white font-semibold"
                                  : "text-gray-800 hover:text-[#2bbef9] hover:bg-[#f0faff]"
                              }`}
                            >
                              <span className="flex items-center gap-2 min-w-0">
                                {item.images && item.images.length > 0 ? (
                                  <img
                                    src={item.images[0]}
                                    alt={item.name}
                                    className="w-6 h-6 object-contain shrink-0"
                                  />
                                ) : (
                                  <span className="text-lg shrink-0">📦</span>
                                )}
                                <span className="truncate">{item.name}</span>
                              </span>
                              <MdKeyboardArrowRight
                                size={16}
                                className={`transition-transform duration-200 group-hover/item:translate-x-0.5 ${
                                  isActive ? "text-white" : "text-gray-400"
                                }`}
                              />
                            </Link>

                            <div className="absolute left-full top-0 min-w-[220px] bg-white shadow-xl rounded-xl p-2 opacity-0 invisible transform translate-x-2 group-hover/item:opacity-100 group-hover/item:visible group-hover/item:translate-x-0 transition-all duration-200 ease-in-out z-50 border border-gray-100 ml-2">
                              {item.subCategories.map((subCategory) => (
                                <Link
                                  key={subCategory._id || subCategory.label}
                                  to={`/cat/${item._id}?subcategory=${subCategory._id || subCategory.label}`}
                                  onClick={() => setShowCategoryMenu(false)}
                                  className="block p-2 text-[14px] text-gray-800 hover:text-[#2bbef9] hover:bg-[#f0faff] rounded-lg transition-all duration-200 mb-1 last:mb-0"
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
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
          )}
          <div className="w-full lg:pl-[10%]">
            <div className="w-full flex items-center gap-6">
              {/* HOME fixed */}
              <div className="shrink-0">
                <Link
                  to="/"
                  className={`font-medium text-[14px] uppercase transition-colors relative flex items-center gap-1 ${
                    isHomePage
                      ? "text-[#2bbef9] after:scale-x-100"
                      : "text-black hover:text-[#2bbef9] after:scale-x-0 hover:after:scale-x-100"
                  } after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-[#2bbef9] after:left-0 after:bottom-[-4px] after:transition-transform after:duration-300 after:origin-left`}
                >
                  <MdHome size={16} className="inline-block mr-1" /> HOME
                </Link>
              </div>

              {/* Categories horizontal scroll */}
              <div
                className="flex-1 overflow-x-auto max-w-[70%] scrollbar-hide [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:rounded-xl
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-300"
              >
                <ul className="flex items-center justify-start gap-6 md:gap-8 py-2 min-w-max">
                  {loading && <li className="text-gray-600">Loading...</li>}
                  {error && <li className="text-red-500">{error}</li>}
                  {!loading &&
                    !error &&
                    categories.map((category) => {
                      const isActive = activeCategoryId === category._id;
                      return (
                        <li key={category._id} className="w-auto group relative">
                          <Link
                            to={`/cat/${category._id}`}
                            className={`font-medium text-[14px] uppercase transition-colors relative flex items-center gap-1 ${
                              isActive
                                ? "text-[#2bbef9] after:scale-x-100"
                                : "text-black hover:text-[#2bbef9] after:scale-x-0 hover:after:scale-x-100"
                            } after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-[#2bbef9] after:left-0 after:bottom-[-4px] after:transition-transform after:duration-300 after:origin-left`}
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
                              className={`transition-transform duration-200 ${
                                isActive ? "rotate-90" : "group-hover:rotate-90"
                              }`}
                            />
                          </Link>
                          
                          {/* Subcategory dropdown */}
                          {category.subCategories && category.subCategories.length > 0 && (
                            <div className="absolute top-[100%] left-0 min-w-[220px] bg-white shadow-xl rounded-xl p-3 opacity-0 invisible transform translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-in-out z-50 border border-gray-100">
                              {category.subCategories.map((subCategory) => (
                                <Link
                                  key={subCategory._id || subCategory.label}
                                  to={`/cat/${category._id}?subcategory=${subCategory._id || subCategory.label}`}
                                  className="block py-2 px-3 text-[14px] text-gray-800 hover:text-[#2bbef9] hover:bg-[#f0faff] rounded-lg transition-all duration-200 mb-1 last:mb-0"
                                >
                                  <span className="flex items-center gap-2">
                                    <span className="text-[16px] text-[#2bbef9]">
                                      {subCategory.icon}
                                    </span>
                                    {subCategory.label}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          )}
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Navbar>
  );
}

export default Navigations;
