/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        background: "#ffffff",
        backgroundHeaders: "#313131FF",
        hintColor: "#F1F1F1FF",
        primary: '#4B82FF',
        hoverPrimary: '#1D5AE7FF',
        onPrimary: '#FFFFFFFF',
        colorText: "#313131FF",
        border: "#292929FF",
      }
    },
  },
  plugins: [],
}

