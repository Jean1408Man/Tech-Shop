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
        primary: "#F2613F",
        "primary-light": "#F57C5E",
        "primary-dark": "#d84f33",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        "fade-out": {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        "fade-in-ft": {
          from: {
            opacity: 0,
            transform: "translateY(-16px)",
          },
          to: {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
        "fade-in-fb": {
          from: {
            opacity: 0,
            transform: "translateY(16px)",
          },
          to: {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
        "fade-in-fl": {
          from: {
            opacity: 0,
            transform: "translateX(-16px)",
          },
          to: {
            opacity: 1,
            transform: "translateX(0)",
          },
        },
        "fade-in-fr": {
          from: {
            opacity: 0,
            transform: "translateX(16px)",
          },
          to: {
            opacity: 1,
            transform: "translateX(0)",
          },
        },
        "fade-out-ft": {
          from: {
            opacity: 1,
            transform: "translateY(-16px)",
          },
          to: {
            opacity: 0,
            transform: "translateY(0)",
          },
        },
        "fade-out-fb": {
          from: {
            opacity: 1,
            transform: "translateY(16px)",
          },
          to: {
            opacity: 0,
            transform: "translateY(0)",
          },
        },
        "fade-out-fl": {
          from: {
            opacity: 1,
            transform: "translateX(-16px)",
          },
          to: {
            opacity: 0,
            transform: "translateX(0)",
          },
        },
        "fade-out-fr": {
          from: {
            opacity: 1,
            transform: "translateX(16px)",
          },
          to: {
            opacity: 0,
            transform: "translateX(0)",
          },
        },
      },
      animation: {
        "fade-in": "fade-in 0.25s ease-in-out",
        "fade-out": "fade-out 0.25s ease-in-out",
        "fade-in-ft": "fade-in-ft 0.25s ease-in-out",
        "fade-in-fb": "fade-in-fb 0.25s ease-in-out",
        "fade-in-fl": "fade-in-fl 0.25s ease-in-out",
        "fade-in-fr": "fade-in-fr 0.25s ease-in-out",
        "fade-out-ft": "fade-out-ft 0.25s ease-in-out",
        "fade-out-fb": "fade-out-fb 0.25s ease-in-out",
        "fade-out-fl": "fade-out-fl 0.25s ease-in-out",
        "fade-out-fr": "fade-out-fr 0.25s ease-in-out",
      },
    },
  },
  plugins: [],
};
