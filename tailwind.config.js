/** @type {import('tailwindcss').Config} */
module.exports = {
  // Tell Tailwind where to find class names. We include the pages,
  // components and data directories. If you add new folders, update
  // this array accordingly.
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./context/**/*.{js,jsx}",
    "./data/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Define a primary brand colour similar to Temu’s distinctive
        // orange. You can tweak this to better match your own brand.
        primary: '#F2613F',
        'primary-light': '#F57C5E',
        'primary-dark': '#d84f33',
      },
    },
  },
  plugins: [],
};