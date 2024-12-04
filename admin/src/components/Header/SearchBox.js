import { Button } from "@mui/material";
import React, { useState } from "react";
import { MdMenuOpen, MdSearch } from "react-icons/md";

function SearchBox() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      console.log("Searching for:", searchTerm);
      // Add your search functionality here
    }
  };

  return (
    <div className="md:flex items-center space-x-3 hidden">
      {/* Menu Button */}
      <Button
        className="!rounded-full !min-w-[40px] !min-h-[40px] items-center !bg-slate-200"
        onClick={() => console.log("Menu opened")}
      >
        <MdMenuOpen className="mx-auto text-black" size={20} />
      </Button>

      {/* Search Box */}
      <div className="flex items-center bg-blue-50 rounded-xl px-4 py-2 shadow-sm">
        <MdSearch
          className="cursor-pointer text-gray-500"
          size={20}
          onClick={handleSearch}
        />
        <input
          type="text"
          placeholder="Search here..."
          value={searchTerm}
          onChange={handleInputChange}
          className="bg-transparent px-2 focus:outline-none text-gray-700 text-sm placeholder-gray-500 w-full"
        />
      </div>
    </div>
  );
}

export default SearchBox;
