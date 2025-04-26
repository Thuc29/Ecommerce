// CustomerReviews.js
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
import { useTheme } from "../../Theme/ThemeContext";

function CustomerReviews({ reviews = [] }) {
  const { theme } = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const handleClick = (event, review) => {
    setAnchorEl(event.currentTarget);
    setSelectedReview(review);
    setIsOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedReview(null);
    setIsOpen(false);
  };

  return (
    <>
      <div>
        <div className="flex items-center py-3">
          <h1 className="text-[16px] font-semibold">Customer Reviews</h1>
          <hr className="flex-grow border-gray-700 ml-4" />
        </div>
        <div className="flex flex-col gap-[30px]">
          {reviews.length === 0 ? (
            <p className="text-gray-300">No reviews yet.</p>
          ) : (
            reviews.map((review) => (
              <div key={review._id} className="flex text-white gap-[25px]">
                <div className="p-9 bg-slate-700 rounded-xl w-full">
                  <div className="flex items-center mb-4 rounded-lg">
                    <img
                      src={review.user?.avatar || "https://placehold.co/50x50"}
                      alt="Profile picture of the user"
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h2 className="text-lg font-semibold">
                        {review.user?.name || "Anonymous"}
                      </h2>
                      <p className="text-sm text-gray-400">
                        {new Date(review.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="ml-auto">
                      <button className="bg-blue-600 text-white px-3 py-2 rounded-lg flex">
                        <MdReply className="mr-2" size={20} />
                        <p className="align-middle font-semibold">REPLY</p>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center my-2 gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <i
                        key={star}
                        className={`material-icons text-yellow-500 ${
                          star <= review.rating ? "star" : "star_border"
                        }`}
                      >
                        star
                      </i>
                    ))}
                  </div>
                  <p className="text-gray-300 leading-[1.8]">
                    {review.comment}
                  </p>
                </div>
                <div className="relative inline-block">
                  <IconButton
                    className={`!rounded-full !w-10 !h-10 !transition !duration-300 ${
                      theme === "dark"
                        ? "!bg-slate-700 !text-white"
                        : "!bg-gray-300"
                    }`}
                    onClick={(e) => handleClick(e, review)}
                  >
                    <MdMoreVert size={20} />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={isOpen && selectedReview?._id === review._id}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    PaperProps={{
                      style: {
                        marginTop: "20px",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        backgroundColor: theme === "light" ? "#fff" : "#333",
                        color: theme === "light" ? "#000" : "#fff",
                      },
                    }}
                  >
                    <MenuItem
                      onClick={() => {
                        alert(`Edit review ${review._id}`);
                        handleClose();
                      }}
                    >
                      <MdEdit className="mr-2" size={18} />
                      Edit
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        alert(`Block review ${review._id}`);
                        handleClose();
                      }}
                    >
                      <MdBlock className="mr-2" size={18} />
                      Block
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        alert(`Report review ${review._id}`);
                        handleClose();
                      }}
                    >
                      <MdReport className="mr-2" size={18} />
                      Report
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        alert(`Delete review ${review._id}`);
                        handleClose();
                      }}
                    >
                      <MdDelete className="mr-2" size={18} />
                      Delete
                    </MenuItem>
                  </Menu>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default CustomerReviews;
