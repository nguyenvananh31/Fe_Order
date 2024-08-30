/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#ffffff"
      },
      colors: {
        primary: '#ffffff', // Thêm màu nền chính
      },
      dropShadow: {
        'primary': '0 0.125rem 0.25rem rgba(165, 163, 174, 0.3)',
      },
      borderRadius: {
        'primary': "0.375rem"
      }
    },
  },
  plugins: [],
}