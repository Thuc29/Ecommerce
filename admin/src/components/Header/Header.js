import React from "react";
import { Link } from "react-router-dom";
import CartButton from "./CartButton";
import MailButton from "./MailButton";
import NotificationsButton from "./NotificationButton";
import ProfileButton from "./ProfileButton";
import SearchBox from "./SearchBox";
import LightMode from "./LightMode";
import { useTheme } from "./ThemeContext";

const Header = () => {
  const { theme } = useTheme();

  return (
    <header
      className={`fixed top-0 z-[1000] left-0 right-0 flex items-center justify-between px-6 py-3 border-b ${
        theme === "light"
          ? "bg-white border-gray-200"
          : "bg-gray-800 border-gray-700"
      }`}
    >
      {/* Logo Section */}
      <div className="space-x-3 md:w-2/12">
        <Link to={"/"} className="flex items-center">
          <img
            src="/assets/images/logoAdmin.png"
            alt="HOTASH logo"
            className="h-10 w-10 rounded-full"
          />
          <h1
            className={`text-xl font-bold tracking-wide !font-['Space_Grotesk']${
              theme === "light" ? "text-gray-800" : "text-gray-100"
            }`}
          >
            T-Admin
          </h1>
        </Link>
      </div>

      {/* Buttons Section */}
      <div className="flex md:w-10/12 justify-between">
        <SearchBox />
        <div className="flex items-center space-x-4">
          <LightMode />
          <CartButton />
          <MailButton />
          <NotificationsButton />
          <ProfileButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
