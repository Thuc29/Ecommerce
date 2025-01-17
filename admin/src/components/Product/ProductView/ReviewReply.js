import { Button } from "@mui/material";
import React from "react";

function ReviewReply() {
  return (
    <>
      <div>
        {" "}
        <div className="flex items-center py-5">
          <h1 className="text-[16px] font-semibold capitalize">
            review reply form
          </h1>
          <hr className="flex-grow border-gray-700 ml-4" />
        </div>
        <form className="gap-2">
          <textarea
            className="w-full h-[200px] py-[10px] px-[15px] bg-gray-700 border border-gray-800 rounded-lg text-sm font-medium overflow-hidden text-ellipsis whitespace-nowrap"
            placeholder="Write here"
          ></textarea>
          <Button className="!cursor-pointer !text-sm !mt-6 !w-full !h-7 !py-6 !px-0 !uppercase !rounded-xl !bg-blue-700 !text-white !font-semibold">
            drop your replies
          </Button>
        </form>
      </div>
    </>
  );
}

export default ReviewReply;
