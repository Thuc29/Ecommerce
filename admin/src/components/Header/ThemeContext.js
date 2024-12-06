import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light"); // Default theme is light

  useEffect(() => {
    // Đọc trạng thái từ localStorage hoặc thiết lập mặc định là "light"
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);

    // Áp dụng lớp dark vào html hoặc body để áp dụng dark mode toàn trang
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    // Áp dụng dark mode vào body hoặc html
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
