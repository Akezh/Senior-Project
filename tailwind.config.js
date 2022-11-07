/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          650: "#202A38",
          750: "#192331",
          850: "#121D2A",
        },
        green: {
          550: "#94DD3C",
        },
      },
    },
  },
  plugins: [],
};
