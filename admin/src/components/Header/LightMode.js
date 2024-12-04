import { Button, IconButton } from "@mui/material";
import React from "react";
import { MdOutlineLightMode } from "react-icons/md";

function LightMode() {
  return (
    <>
      <IconButton className="!rounded-full items-center  !bg-slate-200">
        <MdOutlineLightMode
          className="mx-auto text-black hover:text-blue-500"
          size={20}
        />
      </IconButton>
    </>
  );
}

export default LightMode;
