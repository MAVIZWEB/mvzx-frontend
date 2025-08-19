 /** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#fdf6e3",
        "glassy-red": "rgba(220,38,38,0.85)", // red-600 with transparency
      },
    },
  },
  plugins: [],
};
