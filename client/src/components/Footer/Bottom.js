import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faInfoCircle,
  faShoppingBag,
  faBlog,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const FooterBottom = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="footer-bottom py-4 bg-gray-800">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="lg:pl-[15%]">
          <ul className="flex lg:space-x-[20px] space-x-4">
            <li>
              <Link
                to="/"
                className="text-sm text-gray-300 hover:text-[#2bbef9] flex items-center space-x-2"
              >
                <FontAwesomeIcon icon={faHome} />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="text-sm text-gray-300 hover:text-[#2bbef9] flex items-center space-x-2 bg-transparent border-none cursor-pointer p-0"
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                <span>About</span>
              </button>
            </li>
            <li>
              <Link
                to="/listing"
                className="text-sm text-gray-300 hover:text-[#2bbef9] flex items-center space-x-2"
              >
                <FontAwesomeIcon icon={faShoppingBag} />
                <span>Shop</span>
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="text-sm text-gray-300 hover:text-[#2bbef9] flex items-center space-x-2 bg-transparent border-none cursor-pointer p-0"
              >
                <FontAwesomeIcon icon={faBlog} />
                <span>Blog</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className="text-sm text-gray-300 hover:text-[#2bbef9] flex items-center space-x-2 bg-transparent border-none cursor-pointer p-0"
              >
                <FontAwesomeIcon icon={faEnvelope} />
                <span>Contact</span>
              </button>
            </li>
          </ul>
        </div>
        <div className="footer-copy text-sm text-gray-400">
          <p>&copy; {currentYear}, All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;
