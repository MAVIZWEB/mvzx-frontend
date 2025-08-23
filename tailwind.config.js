 /** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#fdf6e3",
        "glassy-red": "rgba(220,38,38,0.85)", // red-600 with transparency

        // App brand colors
        primary: "#1E293B",   // slate-800 (dark header/footer)
        secondary: "#0F172A", // slate-900
        accent: "#FACC15",    // yellow-400 (for highlights)
        success: "#22C55E",   // green-500
        warning: "#F97316",   // orange-500
        danger: "#DC2626",    // red-600
        muted: "#94A3B8",     // slate-400 (for subtle text)

        // Background levels
        bgLight: "#F8FAFC",   // light neutral
        bgDark: "#0F172A",    // very dark
        card: "rgba(255,255,255,0.9)", // frosted glass card look
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        soft: "0 2px 8px rgba(0,0,0,0.08)",
        glass: "0 4px 16px rgba(0,0,0,0.12)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        fadeIn: "fadeIn 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};
