import React, { useState } from "react";
import {
  MdBlock,
  MdDelete,
  MdEdit,
  MdMoreVert,
  MdReply,
  MdReport,
} from "react-icons/md";
import { Button, IconButton, Menu, MenuItem } from "@mui/material";

function CustomerReviews() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setIsOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsOpen(false);
  };
  return (
    <>
      <div>
        <div className="flex items-center py-3">
          <h1 className="text-[16px] font-semibold">Customer_reviews</h1>
          <hr className="flex-grow border-gray-700 ml-4" />
        </div>
        <div className="flex flex-col gap-[30px]">
          <div className=" flex text-white gap-[25px]">
            <div className="p-9 bg-slate-700 rounded-xl">
              <div className="flex items-center mb-4 rounded-lg">
                <img
                  src="https://placehold.co/50x50"
                  alt="Profile picture of the user"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h2 className="text-lg font-semibold">Miron Mahmud</h2>
                  <p className="text-sm text-gray-400">25 minutes ago!</p>
                </div>
                <div className=" ml-auto">
                  <button className="bg-blue-600 text-white px-3 py-2 rounded-lg flex">
                    <MdReply className="mr-2" size={20} />
                    <p className="align-middle font-semibold">REPLY</p>
                  </button>
                </div>
              </div>
              <div className="flex items-center my-2 gap-1">
                <i className="material-icons text-yellow-500">star</i>
                <i className="material-icons text-yellow-500">star</i>
                <i className="material-icons text-yellow-500">star</i>
                <i className="material-icons text-yellow-500">star</i>
                <i className="material-icons text-yellow-500">star_half</i>
              </div>
              <p className="text-gray-300 leading-[1.8]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
                quo nostrum dolore fugiat ducimus labore debitis unde autem
                recusandae? Eius harum tempora quis minima, adipisci natus quod
                magni omnis quas.
              </p>
            </div>
            <div className="relative inline-block">
              <IconButton
                className="!bg-slate-700 !text-white !rounded-full !w-10 !h-10 !shadow-lg !transition !duration-300"
                onClick={handleClick}
              >
                <MdMoreVert size={20} />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={isOpen}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem
                  onClick={() => {
                    alert("Edit clicked");
                    handleClose();
                  }}
                >
                  <MdEdit className="mr-2" size={18} />
                  Edit
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    alert("Block clicked");
                    handleClose();
                  }}
                >
                  <MdBlock className="mr-2" size={18} />
                  Block
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    alert("Report clicked");
                    handleClose();
                  }}
                >
                  <MdReport className="mr-2" size={18} />
                  Report
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    alert("Delete clicked");
                    handleClose();
                  }}
                >
                  <MdDelete className="mr-2" size={18} />
                  Delete
                </MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerReviews;
