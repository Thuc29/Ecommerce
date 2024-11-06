import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAppleAlt,
  faTruck,
  faTags,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";

const IconBoxes = () => {
  return (
    <div className="footer-iconboxes py-6 lg:mb-[7%] lg:bg-white md:bg-gray-200 lg:border-b-2 sm:bg-gray-200">
      <div className="container mx-auto px-4 lg:max-w-[1270px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          <div className="iconbox lg:border-r-2">
            <div className="iconbox-icon">
              <FontAwesomeIcon icon={faAppleAlt} className="text-xl pr-2" />
              <span>Everyday fresh products</span>
            </div>
          </div>
          <div className="iconbox lg:border-r-2">
            <div className="iconbox-icon">
              <FontAwesomeIcon icon={faTruck} className="text-xl pr-2" />
              <span>Free delivery for orders over $70</span>
            </div>
          </div>
          <div className="iconbox lg:border-r-2">
            <div className="iconbox-icon">
              <FontAwesomeIcon icon={faTags} className="text-xl pr-2" />
              <span>Daily Mega Discounts</span>
            </div>
          </div>
          <div className="iconbox">
            <div className="iconbox-icon">
              <FontAwesomeIcon icon={faDollarSign} className="text-xl pr-2" />
              <span>Best price on the market</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconBoxes;
