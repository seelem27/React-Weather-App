/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ["Noto Sans", "sans-serif"]
      },
      screens: {
        'xs': '530px',
      },
    },
  },
  plugins: [],
  darkMode: 'class'
}