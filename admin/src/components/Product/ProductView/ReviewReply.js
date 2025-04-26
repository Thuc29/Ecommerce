// ReviewReply.js
import { Button } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useTheme } from "../../Theme/ThemeContext";

function ReviewReply({ productId }) {
  const { theme } = useTheme();
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(`/api/products/${productId}/reviews`, {
        comment,
        // Thêm các trường khác nếu cần, như rating
      });
      setSuccess("Review submitted successfully!");
      setComment("");
    } catch (err) {
      setError("Failed to submit review");
      console.error("Error submitting review:", err);
    }
  };

  return (
    <>
      <div>
        <div
          className={`flex items-center py-5 ${
            theme === "light" ? "text-gray-900" : "text-gray-200"
          }`}
        >
          <h1 className="text-[16px] font-semibold capitalize opacity-80">
            Review Reply Form
          </h1>
          <hr
            className={`flex-grow ${
              theme === "light" ? "border-gray-700" : "border-gray-500"
            } ml-4`}
          />
        </div>
        <form onSubmit={handleSubmit} className="gap-2">
          <textarea
            className={`w-full h-[200px] py-[10px] px-[15px] border rounded-lg text-sm font-medium overflow-hidden text-ellipsis whitespace-nowrap ${
              theme === "light"
                ? "bg-gray-100 text-gray-900 border-gray-300"
                : "bg-gray-700 text-gray-200 border-gray-800"
            }`}
            placeholder="Write here"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {success && <p className="text-green-500 mt-2">{success}</p>}
          <Button
            type="submit"
            className={`!cursor-pointer !text-sm !mt-6 !w-full !h-7 !py-6 !px-0 !uppercase !rounded-xl ${
              theme === "light"
                ? "!bg-blue-600 !text-white"
                : "!bg-blue-700 !text-gray-200"
            } !font-semibold`}
          >
            Drop Your Replies
          </Button>
        </form>
      </div>
    </>
  );
}

export default ReviewReply;
