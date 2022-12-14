/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'

  ],
  theme: {

    extend: {
      colors: {
        yellow: "#DAAC27",
        black: "#000000",
        lightGray: "#EEEEEE",
        white: "#FFFFFF",
        blue: "#0D6EFD",
        green: "#32B25D",
        alertGreen: {
          200: "#bbf7d0",
          900: "#064e3b"
        },
        darkGray: "#bababa",
      },
    },
  },
  plugins: [
    // require('flowbite/plugin')
  ],
}