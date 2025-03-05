/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'how-it-works-bg': '#d9b75e',
        'recipe-card-bg': '#d0ded5',
        'button-bg': '#1e2d3d',
        'button-hover': '#16232e',
      },
    },
  },
  plugins: [],
}

