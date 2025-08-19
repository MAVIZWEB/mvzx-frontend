 /** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FFFDF5",
          100: "#FFFDD0", // Soft cream for text & buttons
          200: "#FAF3E0",
        },
        wine: {
          800: "#6A0D2E", // Rich wine red
          900: "#4B0E1A", // Darker wine base
        },
      },
    },
  },
  plugins: [],
};
