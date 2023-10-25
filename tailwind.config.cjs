/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        fira_sans: ["Fira Sans", "Great Vibes", "cursive", "sans-serif"],
      },
    },
  },
  plugins: [],
};
