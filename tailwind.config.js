/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        "bubbles": "#0097ff",
        "main": "#00214B",
      },
      fontFamily: {
        bold: ['axiforma-bold'],
        black: ['axiforma-black'],
        medium: ['axiforma-medium'],
        semibold: ['axiforma-semibold'],
        regular: ['axiforma-regular']
      }
    },
  },
  plugins: [],
}
