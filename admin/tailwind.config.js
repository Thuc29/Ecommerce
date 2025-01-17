module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // Kích hoạt dark mode bằng class
  theme: {
    extend: {},
    variants: {
      extend: {
        after: ["hover"], // Enable `after` for hover states
      },
    },
  },
  plugins: [],
};
