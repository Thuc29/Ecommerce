import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Contacts = () => {
  return (
    <div className="footer-contacts py-[5%]">
      <div className="container mx-auto px-4 lg:max-w-[1270px] flex flex-wrap justify-between">
        <div className="column column-left">
          <div className="site-phone flex items-center">
            <div className="phone-icon mr-2">
              <FontAwesomeIcon icon={faPhone} size="lg" />
            </div>
            <div className="phone-detail">
              <h4 className="entry-title text-xl">8 800 555-55</h4>
              <span className="text-sm">Working 8:00 - 22:00</span>
            </div>
          </div>
        </div>
        <div className="column column-right flex">
          <div className="site-mobile-app">
            <h6 className="entry-title text-xl">
              Download App on Mobile :{" "}
              <div className="site-social mt-4">
                <ul className="flex space-x-4">
                  <li>
                    <a
                      href="https://www.facebook.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon
                        icon={faFacebook}
                        size="xl"
                        className="hover:text-[#2d5bff]"
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://twitter.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon
                        icon={faTwitter}
                        size="xl"
                        className="hover:text-[#14e0fb]"
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon
                        icon={faInstagram}
                        size="xl"
                        className="hover:text-red-500"
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </h6>
            <span className="text-sm mb-4">
              15% discount on your first purchase
            </span>
            <div className="app-buttons flex space-x-4">
              <a href="https://play.google.com/store" className="google-play">
                <img
                  src="https://klbtheme.com/bacola/wp-content/uploads/2021/04/google-play.png"
                  alt="Google Play"
                />
              </a>
              <a href="https://www.apple.com/app-store/" className="app-store">
                <img
                  src="https://klbtheme.com/bacola/wp-content/uploads/2021/04/app-store.png"
                  alt="App Store"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
