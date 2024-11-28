import React from "react";
import { Button, Col, Container, Navbar, Row } from "react-bootstrap";
import {
  MdKeyboardArrowRight,
  MdOutlinePerson,
  MdPersonOutline,
  MdChildCare,
  MdOutlineAccessibility,
  MdSmartphone,
  MdLaptopMac,
  MdHeadphones,
  MdSportsEsports,
  MdChair,
  MdHome,
  MdKitchen,
  MdBed,
  MdRestaurant,
  MdFastfood,
  MdLocalCafe,
  MdEco,
  MdFitnessCenter,
  MdSportsSoccer,
  MdSports,
  MdOutlineSportsHandball,
  MdGames,
  MdGamepad,
  MdComputer,
  MdMenuBook,
  MdEdit,
  MdBrush,
  MdColorLens,
  MdPalette,
  MdCreate,
  MdHandyman,
  MdYard,
  MdGrass,
  MdOutdoorGrill,
  MdPark,
  MdCardGiftcard,
  MdContactMail,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";

function Navigations() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const [showCategoryMenu, setShowCategoryMenu] = React.useState(false);

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

  const handleCategoryClick = () => {
    setShowCategoryMenu(!showCategoryMenu);
  };

  return (
    <Navbar className="relative  w-full bg-white">
      <Container className="max-w-[1400px] mx-auto lg:px-7 md:px-5 px-7">
        <div className="flex flex-col md:flex-row w-full items-center gap-3 md:gap-5">
          {showCategories && (
            <div className="w-full md:w-auto lg:w-auto lg:pl-[52px]">
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
                <div className="absolute top-[100%] min-w-[220px] bg-white shadow-xl rounded-2xl p-5 z-50 border border-gray-100">
                  {[
                    {
                      icon: "👕",
                      label: "Fashion",
                      subCategories: [
                        {
                          icon: <MdOutlinePerson />,
                          label: "Men's Wear",
                        },
                        { icon: <MdPersonOutline />, label: "Women's Wear" },
                        { icon: <MdChildCare />, label: "Kids' Wear" },
                        {
                          icon: <MdOutlineAccessibility />,
                          label: "Accessories",
                        },
                      ],
                    },
                    {
                      icon: "📱",
                      label: "Electronics",
                      subCategories: [
                        { icon: <MdSmartphone />, label: "Smartphones" },
                        { icon: <MdLaptopMac />, label: "Laptops" },
                        { icon: <MdHeadphones />, label: "Accessories" },
                        { icon: <MdSportsEsports />, label: "Gaming" },
                      ],
                    },
                    {
                      icon: "🏠",
                      label: "Home & Living",
                      subCategories: [
                        { icon: <MdChair />, label: "Furniture" },
                        { icon: <MdHome />, label: "Home Decor" },
                        { icon: <MdKitchen />, label: "Kitchen & Dining" },
                        { icon: <MdBed />, label: "Bedding" },
                      ],
                    },
                    {
                      icon: "🍔",
                      label: "Food & Beverages",
                      subCategories: [
                        { icon: <MdRestaurant />, label: "Groceries" },
                        { icon: <MdFastfood />, label: "Snacks" },
                        { icon: <MdLocalCafe />, label: "Beverages" },
                        { icon: <MdEco />, label: "Organic Food" },
                      ],
                    },
                    {
                      icon: "💪",
                      label: "Sports & Fitness",
                      subCategories: [
                        {
                          icon: <MdFitnessCenter />,
                          label: "Exercise Equipment",
                        },
                        { icon: <MdSportsSoccer />, label: "Sports Gear" },
                        { icon: <MdSports />, label: "Activewear" },
                        {
                          icon: <MdOutlineSportsHandball />,
                          label: "Supplements",
                        },
                      ],
                    },
                    {
                      icon: "🎮",
                      label: "Gaming",
                      subCategories: [
                        { icon: <MdGames />, label: "Consoles" },
                        { icon: <MdGamepad />, label: "Video Games" },
                        { icon: <MdHeadphones />, label: "Gaming Accessories" },
                        { icon: <MdComputer />, label: "PC Gaming" },
                      ],
                    },
                    {
                      icon: "📚",
                      label: "Books & Stationery",
                      subCategories: [
                        { icon: <MdMenuBook />, label: "Books" },
                        { icon: <MdEdit />, label: "Notebooks" },
                        { icon: <MdCreate />, label: "Writing Tools" },
                        { icon: <MdBrush />, label: "Art Supplies" },
                      ],
                    },
                    {
                      icon: "🎨",
                      label: "Arts & Crafts",
                      subCategories: [
                        { icon: <MdPalette />, label: "Painting Supplies" },
                        { icon: <MdColorLens />, label: "Craft Kits" },
                        { icon: <MdBrush />, label: "Drawing Tools" },
                        { icon: <MdHandyman />, label: "DIY Materials" },
                      ],
                    },
                    {
                      icon: "🪴",
                      label: "Garden & Outdoor",
                      subCategories: [
                        { icon: <MdYard />, label: "Plants" },
                        { icon: <MdGrass />, label: "Garden Tools" },
                        {
                          icon: <MdOutdoorGrill />,
                          label: "Outdoor Furniture",
                        },
                        { icon: <MdPark />, label: "Seeds & Fertilizers" },
                      ],
                    },
                  ].map((item) => (
                    <div key={item.label} className="group/item relative">
                      <Link
                        to="/"
                        className="block  text-[14px] text-gray-800 hover:text-[#2bbef9] hover:bg-[#f0faff] rounded-lg transition-all duration-200 mb-2 last:mb-0 relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-[#2bbef9] after:left-0 after:bottom-[-4px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
                      >
                        <span className="flex items-center justify-between ">
                          <span className="flex items-center gap-2">
                            <span className="text-lg">{item.icon}</span>
                            {item.label}
                          </span>
                          <MdKeyboardArrowRight
                            size={16}
                            className="transition-transform duration-200 group-hover/item:rotate-90"
                          />
                        </span>
                      </Link>

                      <div className="absolute left-full top-0 min-w-[200px] bg-white shadow-xl rounded-xl p-4 opacity-0 invisible transform translate-x-2 group-hover/item:opacity-100 group-hover/item:visible group-hover/item:translate-x-0 transition-all duration-200 ease-in-out z-50 border border-gray-100 ml-2">
                        {item.subCategories.map((subCategory) => (
                          <Link
                            key={subCategory.label}
                            to="/"
                            className="block py-1 px-3 text-[14px] text-gray-800 hover:text-[#2bbef9] hover:bg-[#f0faff] rounded-lg transition-all duration-200 mb-2 last:mb-0 relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-[#2bbef9] after:left-0 after:bottom-[-4px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
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
            className="w-full overflow-x-auto scrollbar-hide lg:pl-[15%] [&::-webkit-scrollbar]:h-1
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

              <li className="w-auto group">
                <Link
                  to="/"
                  className="text-black font-medium text-[14px] uppercase hover:text-[#2bbef9] transition-colors relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-[#2bbef9] after:left-0 after:bottom-[-4px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left flex items-center gap-1"
                >
                  <MdOutlinePerson size={16} className="inline-block mr-1" />{" "}
                  WOMEN{" "}
                  <MdKeyboardArrowRight
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
              <li className="w-auto group">
                <Link
                  to="/"
                  className="text-black font-medium text-[14px] uppercase hover:text-[#2bbef9] transition-colors relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-[#2bbef9] after:left-0 after:bottom-[-4px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left flex items-center gap-1"
                >
                  <MdPersonOutline size={16} className="inline-block mr-1" />{" "}
                  MEN{" "}
                  <MdKeyboardArrowRight
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

              <li className="w-auto group">
                <Link
                  to="/"
                  className="text-black font-medium text-[14px] uppercase hover:text-[#2bbef9] transition-colors relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-[#2bbef9] after:left-0 after:bottom-[-4px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left flex items-center gap-1"
                >
                  <MdChildCare size={16} className="inline-block mr-1" /> KIDS{" "}
                  <MdKeyboardArrowRight
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

              <li className="w-auto group">
                <Link
                  to="/"
                  className="text-black font-medium text-[14px] uppercase hover:text-[#2bbef9] transition-colors relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-[#2bbef9] after:left-0 after:bottom-[-4px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left flex items-center gap-1"
                >
                  <MdBrush size={16} className="inline-block mr-1" /> BEAUTY{" "}
                  <MdKeyboardArrowRight
                    size={14}
                    className="transition-transform duration-200 group-hover:rotate-180"
                  />
                </Link>
                <div className="absolute top-[100%] min-w-[220px] bg-white shadow-xl rounded-xl p-5 opacity-0 invisible transform translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-in-out z-50 border border-gray-100">
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
                  <MdMenuBook size={16} className="inline-block mr-1" /> BLOG
                </Link>
              </li>

              <li className="whitespace-nowrap relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-[#2bbef9] after:left-0 after:bottom-[-4px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">
                <Link
                  to="/"
                  className="text-black font-medium text-[14px] uppercase hover:text-[#2bbef9] transition-colors relative"
                >
                  <MdCardGiftcard size={16} className="inline-block mr-1" />{" "}
                  GIFT
                </Link>
              </li>

              <li className="w-auto group">
                <Link
                  to="/"
                  className="text-black font-medium text-[14px] uppercase hover:text-[#2bbef9] transition-colors relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-[#2bbef9] after:left-0 after:bottom-[-4px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left flex items-center gap-1"
                >
                  <MdContactMail size={16} className="inline-block mr-1" />{" "}
                  CONTACT{" "}
                  <MdKeyboardArrowRight
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
