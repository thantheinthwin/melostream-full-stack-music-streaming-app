/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'secondary': ['Bungee Hairline'],
        'primary': ['Montserrat Alternates']
      },
      colors: {
        'primary': '#b3c2ff',
        'secondary': '#1d1622',
        'background': '#000000',
        'accent': '#8f06ea'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('prettier-plugin-tailwindcss'),
    require('tailwind-scrollbar-hide')
  ],
}
