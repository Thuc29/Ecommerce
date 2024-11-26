module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      scale: {
        102: "1.02",
      },
      colors: {
        blue: "#0367a6",
        green: "#008997",
      },
      spacing: {
        formHeight: "420px",
        formWidth: "758px",
      },
      transitionTimingFunction: {
        smooth: "ease-in-out",
      },
    },
  },
  plugins: [],
};
