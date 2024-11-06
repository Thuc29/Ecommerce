import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faInfoCircle,
  faShoppingBag,
  faBlog,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

const FooterBottom = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="footer-bottom py-4 bg-gray-800">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="lg:pl-[15%]">
          <ul className="flex lg:space-x-[20px] space-x-4">
            <li>
              <a
                href="#"
                className="text-sm text-gray-300 hover:text-[#2bbef9] flex items-center space-x-2"
              >
                <FontAwesomeIcon icon={faHome} />
                <span>Home</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-sm text-gray-300 hover:text-[#2bbef9] flex items-center space-x-2"
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                <span>About</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-sm text-gray-300 hover:text-[#2bbef9] flex items-center space-x-2"
              >
                <FontAwesomeIcon icon={faShoppingBag} />
                <span>Shop</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-sm text-gray-300 hover:text-[#2bbef9] flex items-center space-x-2"
              >
                <FontAwesomeIcon icon={faBlog} />
                <span>Blog</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-sm text-gray-300 hover:text-[#2bbef9] flex items-center space-x-2"
              >
                <FontAwesomeIcon icon={faEnvelope} />
                <span>Contact</span>
              </a>
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
