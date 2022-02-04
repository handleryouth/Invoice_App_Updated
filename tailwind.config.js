module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {},
  plugins: [require("tw-elements/dist/plugin"), require("@tailwindcss/forms")],
};
