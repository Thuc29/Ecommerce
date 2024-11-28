import { Button } from "@mui/material";
import React from "react";
import { Form } from "react-bootstrap";
import { IoSearch } from "react-icons/io5";

function SearchBox() {
  return (
    <div className="flex-grow w-full md:max-w-2xl">
      <div className="flex items-center h-[40px] md:h-[44px] bg-[#f3f4f7] border border-gray-300 rounded-lg">
        <Form.Control
          type="text"
          placeholder="Search for products ..."
          className="bg-transparent border-none outline-none text-sm md:text-[15px] w-full h-full px-2 md:px-4"
        />
        <Button
          className="h-[40px] md:h-[44px] [&media(min-width:768px)]:min-w-[45px]"
          style={{
            borderRadius: "50%",
            minWidth: "40px",
          }}
        >
          <IoSearch color="#000" size={20} />
        </Button>
      </div>
    </div>
  );
}

export default SearchBox;
