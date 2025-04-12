import defaultTheme from "tailwindcss/defaultTheme";

// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{vue,tsx,ts,js}",
    "./layouts/**/*.{vue,tsx,ts,js}",
    "./pages/**/*.{vue,tsx,ts,js}",
    "./plugins/**/*.{vue,tsx,ts,js}",
    "./nuxt.config.{vue,tsx,ts,js}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".dark\\:shine": {
          textShadow: "0 0 5px",
        },
      });
    },
  ],
};
