/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#722F37',
          light: '#8B3A44',
          dark: '#5A252C',
        }
      }
    },
  },
  plugins: [],
}