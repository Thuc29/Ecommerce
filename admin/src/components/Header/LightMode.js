import { IconButton } from "@mui/material";
import React from "react";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { useTheme } from "../Theme/ThemeContext";

function LightMode() {
  const { theme, toggleTheme } = useTheme();

  return (
    <IconButton
      onClick={toggleTheme}
      className={`!rounded-full items-center ${
        theme === "light" ? "!bg-slate-200" : "!bg-gray-700"
      }`}
    >
      {theme === "light" ? (
        <MdOutlineLightMode
          className="mx-auto text-black hover:text-blue-500"
          size={20}
        />
      ) : (
        <MdOutlineDarkMode
          className="mx-auto text-white hover:text-yellow-400"
          size={20}
        />
      )}
    </IconButton>
  );
}

export default LightMode;
