/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        churchNavy: "#0B192C",
        churchGold: "#D4AF37",
      },
    },
  },
  plugins: [],
}