import React from "react";
import { Link } from "react-router-dom";
import CartButton from "./CartButton";
import MailButton from "./MailButton";
import NotificationsButton from "./NotificationButton";
import ProfileButton from "./ProfileButton";
import SearchBox from "./SearchBox";
import LightMode from "./LightMode";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md flex items-center justify-between px-6 py-3 border-b border-gray-200">
      {/* Logo Section */}
      <div className="space-x-3 md:w-2/12">
        <Link to={"/"} className="flex items-center">
          <img
            src="/assets/images/logoAdmin.png"
            alt="HOTASH logo"
            className="h-10 w-10 rounded-full"
          />
          <h1 className="text-xl font-bold text-gray-800 tracking-wide">
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
