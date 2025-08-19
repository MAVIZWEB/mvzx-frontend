 /** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {8
      colors: {
        cream: "#fdf6e3", // soft cream for background
        ubaRed: "#b30000", // deeper red
        ubaWine: "#7b001c", // wine tone
      },
    },
  },
  plugins: [],
};
