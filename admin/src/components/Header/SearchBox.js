import { IconButton } from "@mui/material";
import React, { useContext, useState } from "react";
import { MdClose, MdMenuOpen, MdOutlineMenu, MdSearch } from "react-icons/md";
import { useTheme } from "../Theme/ThemeContext";
import { MyContext } from "../../App";

function SearchBox() {
  const [searchTerm, setSearchTerm] = useState("");
  const { theme } = useTheme();
  const { isToggleSidebar, setIsToggleSidebar } = useContext(MyContext);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      console.log("Searching for:", searchTerm);
      // Add your search functionality here
    }
  };

  const handleClear = () => {
    setSearchTerm("");
  };

  return (
    <div className={`md:flex pl-8 items-center space-x-3 `}>
      {/* Menu Button */}
      <IconButton
        className={`!rounded-full !items-center !p-2 !mr-4  !shadow-lg  !transition-all ${
          theme === "light" ? "!bg-slate-200" : "!bg-gray-700"
        }`}
        onClick={() => setIsToggleSidebar(!isToggleSidebar)}
      >
        {isToggleSidebar === false ? (
          <MdMenuOpen
            className={`mx-auto ${
              theme === "light"
                ? "text-black hover:text-blue-500"
                : "text-white hover:text-blue-500"
            }`}
            size={20}
          />
        ) : (
          <MdOutlineMenu
            className={`mx-auto ${
              theme === "light"
                ? "text-black hover:text-blue-500"
                : "text-white hover:text-blue-500"
            }`}
            size={20}
          />
        )}
      </IconButton>

      <div
        className={`md:flex items-center bg-blue-50 rounded-xl px-4 py-[5px] shadow-sm hidden ${
          theme === "light" ? "!bg-slate-200" : "!bg-gray-700"
        }`}
      >
        <MdSearch
          className="cursor-pointer text-gray-500 "
          size={25}
          onClick={handleSearch}
        />
        <input
          type="text"
          placeholder="Search here..."
          value={searchTerm}
          onChange={handleInputChange}
          className={`bg-transparent pl-2 transition-all duration-300 ease-in-out  focus:outline-none text-sm placeholder-gray-500 w-full ${
            theme === "light" ? "text-black" : "text-white"
          }`}
        />
        {searchTerm && (
          <MdClose
            className="cursor-pointer text-gray-500"
            size={25}
            onClick={handleClear}
          />
        )}
      </div>
    </div>
  );
}

export default SearchBox;
