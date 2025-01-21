import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";
import "./responsive.css";
import "./index.css";
import { ThemeProvider } from "./components/Theme/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
