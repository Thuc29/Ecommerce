import { Button } from "@mui/material";
import React from "react";
import { useTheme } from "../../Theme/ThemeContext";
function ReviewReply() {
  const { theme } = useTheme();

  return (
    <>
      <div>
        <div
          className={`flex items-center py-5 ${
            theme === "light" ? "text-gray-900" : "text-gray-200"
          }`}
        >
          <h1 className="text-[16px] font-semibold capitalize opacity-80">
            review reply form
          </h1>
          <hr
            className={`flex-grow ${
              theme === "light" ? "border-gray-700" : "border-gray-500"
            } ml-4`}
          />
        </div>
        <form className="gap-2">
          <textarea
            className={`w-full h-[200px] py-[10px] px-[15px] border rounded-lg text-sm font-medium overflow-hidden text-ellipsis whitespace-nowrap ${
              theme === "light"
                ? "bg-gray-100 text-gray-900 border-gray-300"
                : "bg-gray-700 text-gray-200 border-gray-800"
            }`}
            placeholder="Write here"
          ></textarea>
          <Button
            className={`!cursor-pointer !text-sm !mt-6 !w-full !h-7 !py-6 !px-0 !uppercase !rounded-xl ${
              theme === "light"
                ? "!bg-blue-600 !text-white"
                : "!bg-blue-700 !text-gray-200"
            } !font-semibold`}
          >
            drop your replies
          </Button>
        </form>
      </div>
    </>
  );
}

export default ReviewReply;
