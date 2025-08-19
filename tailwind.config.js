/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#fdf6e3",   // soft cream
        ubaRed: "#b30000",  // deep red
        ubaWine: "#7b001c", // wine tone
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"], // clean look
      },
      boxShadow: {
        glass: "0 4px 30px rgba(0, 0, 0, 0.1)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
