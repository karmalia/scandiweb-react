/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        scandiGreen: "#5ECE7B",
      },
      fontFamily: {
        raleway: ["Raleway", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      boxShadow: {
        // Custom shadow extending in all directions
        even: "0 4px 8px rgba(0, 0, 0, 0.1), 0 -4px 8px rgba(0, 0, 0, 0.1)",
        intense:
          "0 6px 12px rgba(0, 0, 0, 0.3), 0 -6px 12px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};
