/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        blue: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#2ecc71",
          600: "#27ae60",
          700: "#1f8f4d",
          800: "#166b3a",
          900: "#0f2f23",
        },
      },
    },
  },
  plugins: [],
};
