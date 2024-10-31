import React from "react";
import { Button, Col, Container, Navbar, Row } from "react-bootstrap";
import { FaAngleDown } from "react-icons/fa6";
import { IoIosMenu } from "react-icons/io";
import { Link } from "react-router-dom";

function Navigations() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
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

  return (
    <Navbar className="relative  w-full bg-white">
      <Container className="max-w-[1400px] mx-auto lg:px-7 md:px-5 px-7">
        <div className="flex flex-col md:flex-row w-full items-center gap-3 md:gap-5">
          {/* Categories Button */}
          {showCategories && (
            <div className="w-full md:w-auto lg:w-auto lg:pl-[52px]">
              <Button
                className="hover:bg-[#2bbef9] bg-[#2bbef9] w-full hidden md:flex"
                style={{
                  borderRadius: "30px",
                  color: "#fff",
                  padding: "8px 16px",
                }}
              >
                <span className="font-medium flex items-center gap-2 justify-center text-[14px]">
                  <IoIosMenu size={20} /> Categories <FaAngleDown size={14} />
                </span>
              </Button>
            </div>
          )}

          {/* Navigation Links */}
          <div className="w-full overflow-x-auto scrollbar-hide lg:pl-[20%]">
            <ul className="flex items-center justify-center md:justify-start gap-6 md:gap-8 py-2 min-w-max">
              <li className="whitespace-nowrap relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-[#2bbef9] after:left-0 after:bottom-[-4px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">
                <Link
                  to="/"
                  className="text-black font-medium text-[14px] uppercase hover:text-[#2bbef9] transition-colors relative"
                >
                  HOME
                </Link>
              </li>

              {/* WOMEN Dropdown */}
              <li className="w-auto group">
                <Link
                  to="/"
                  className="text-black font-medium text-[14px] uppercase hover:text-[#2bbef9] transition-colors relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-[#2bbef9] after:left-0 after:bottom-[-4px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left flex items-center gap-1"
                >
                  WOMEN{" "}
                  <FaAngleDown
                    size={14}
                    className="transition-transform duration-200 group-hover:rotate-180"
                  />
                </Link>
                <div className="absolute top-[100%] min-w-[220px] bg-white shadow-xl rounded-xl p-5 opacity-0 invisible transform translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-in-out z-50 border border-gray-100">
                  {[
                    { icon: "👗", label: "Dresses" },
                    { icon: "👜", label: "Bags" },
                    { icon: "💍", label: "Jewelry" },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      to="/"
                      className="block py-1 px-4 text-[14px] text-gray-800 hover:text-[#2bbef9] hover:bg-[#f0faff] rounded-lg transition-all duration-200 mb-2 last:mb-0 "
                    >
                      <Button className="w-full text-left flex items-center gap-2 relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-[#2bbef9] after:left-0 after:bottom-[-4px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">
                        <span className="text-lg">{item.icon}</span>{" "}
                        {item.label}
                      </Button>
                    </Link>
                  ))}
                </div>
              </li>

              {/* MEN Dropdown */}
              <li className="w-auto group">
                <Link
                  to="/"
                  className="text-black font-medium text-[14px] uppercase hover:text-[#2bbef9] transition-colors relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-[#2bbef9] after:left-0 after:bottom-[-4px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left flex items-center gap-1"
                >
                  MEN{" "}
                  <FaAngleDown
                    size={14}
                    className="transition-transform duration-200 group-hover:rotate-180"
                  />
                </Link>
                <div className="absolute top-[100%] min-w-[220px] bg-white shadow-xl rounded-xl p-5 opacity-0 invisible transform translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-in-out z-50 border border-gray-100">
                  {[
                    { icon: "👔", label: "Formal Wear" },
                    { icon: "👟", label: "Shoes" },
                    { icon: "⌚", label: "Accessories" },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      to="/"
                      className="block py-1 px-4 text-[14px] text-gray-800 hover:text-[#2bbef9] hover:bg-[#f0faff] rounded-lg transition-all duration-200 mb-2 last:mb-0 relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-[#2bbef9] after:left-0 after:bottom-[-4px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
                    >
                      <Button className="w-full text-left flex items-center gap-2">
                        <span className="text-lg">{item.icon}</span>{" "}
                        {item.label}
                      </Button>
                    </Link>
                  ))}
                </div>
              </li>

              {/* KIDS Dropdown */}
              <li className="w-auto group">
                <Link
                  to="/"
                  className="text-black font-medium text-[14px] uppercase hover:text-[#2bbef9] transition-colors relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-[#2bbef9] after:left-0 after:bottom-[-4px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left flex items-center gap-1"
                >
                  KIDS{" "}
                  <FaAngleDown
                    size={14}
                    className="transition-transform duration-200 group-hover:rotate-180"
                  />
                </Link>
                <div className="absolute top-[100%] min-w-[220px] bg-white shadow-xl rounded-xl p-5 opacity-0 invisible transform translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-in-out z-50 border border-gray-100">
                  {[
                    { icon: "🎮", label: "Toys" },
                    { icon: "👕", label: "Children's Wear" },
                    { icon: "📚", label: "School Items" },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      to="/"
                      className="block py-1 px-4 text-[14px] text-gray-800 hover:text-[#2bbef9] hover:bg-[#f0faff] rounded-lg transition-all duration-200 mb-2 last:mb-0 relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-[#2bbef9] after:left-0 after:bottom-[-4px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
                    >
                      <Button className="w-full text-left flex items-center gap-2">
                        <span className="text-lg">{item.icon}</span>{" "}
                        {item.label}
                      </Button>
                    </Link>
                  ))}
                </div>
              </li>

              {/* BEAUTY Dropdown */}
              <li className="w-auto group">
                <Link
                  to="/"
                  className="text-black font-medium text-[14px] uppercase hover:text-[#2bbef9] transition-colors relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-[#2bbef9] after:left-0 after:bottom-[-4px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left flex items-center gap-1"
                >
                  BEAUTY{" "}
                  <FaAngleDown
                    size={14}
                    className="transition-transform duration-200 group-hover:rotate-180"
                  />
                </Link>
                <div className="absolute top-[100%] min-w-[220px] bg-white shadow-xl rounded-xl p-5 opacity-0 invisible transform translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-in-out z-50 border border-gray-100 ">
                  {[
                    { icon: "💄", label: "Makeup" },
                    { icon: "🧴", label: "Skincare" },
                    { icon: "💅", label: "Nail Care" },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      to="/"
                      className="block py-1 px-4 text-[14px] text-gray-800 hover:text-[#2bbef9] hover:bg-[#f0faff] rounded-lg transition-all duration-200 mb-2 last:mb-0"
                    >
                      <Button className="w-full text-left flex items-center gap-2 relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-[#2bbef9] after:left-0 after:bottom-[-4px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">
                        <span className="text-lg">{item.icon}</span>{" "}
                        {item.label}
                      </Button>
                    </Link>
                  ))}
                </div>
              </li>

              <li className="whitespace-nowrap relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-[#2bbef9] after:left-0 after:bottom-[-4px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">
                <Link
                  to="/"
                  className="text-black font-medium text-[14px] uppercase hover:text-[#2bbef9] transition-colors relative"
                >
                  BLOG
                </Link>
              </li>

              <li className="whitespace-nowrap relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-[#2bbef9] after:left-0 after:bottom-[-4px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">
                <Link
                  to="/"
                  className="text-black font-medium text-[14px] uppercase hover:text-[#2bbef9] transition-colors relative"
                >
                  GIFT
                </Link>
              </li>

              {/* CONTACT Dropdown */}
              <li className="w-auto group">
                <Link
                  to="/"
                  className="text-black font-medium text-[14px] uppercase hover:text-[#2bbef9] transition-colors relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-[#2bbef9] after:left-0 after:bottom-[-4px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left flex items-center gap-1"
                >
                  CONTACT{" "}
                  <FaAngleDown
                    size={14}
                    className="transition-transform duration-200 group-hover:rotate-180"
                  />
                </Link>
                <div className="absolute top-[100%] min-w-[220px] bg-white shadow-xl rounded-xl p-5 opacity-0 invisible transform translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-in-out z-50 border border-gray-100">
                  {[
                    { icon: "📞", label: "Customer Service" },
                    { icon: "📍", label: "Store Locator" },
                    { icon: "✉️", label: "Email Support" },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      to="/"
                      className="block py-1 px-4 text-[14px] text-gray-800 hover:text-[#2bbef9] hover:bg-[#f0faff] rounded-lg transition-all duration-200 mb-2 last:mb-0"
                    >
                      <Button className="w-full text-left flex items-center gap-2 relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-[#2bbef9] after:left-0 after:bottom-[-4px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">
                        <span className="text-lg">{item.icon}</span>{" "}
                        {item.label}
                      </Button>
                    </Link>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </Navbar>
  );
}

export default Navigations;
