/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF9324",
      },
      fontFamily: {
        urbanist: ['Urbanist', 'sans-serif'],
      },
      screens: {
        xs: '1920px',
      },
      keyframes: {
        modalBackdrop: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        modalPop: {
          '0%': { opacity: '0', transform: 'scale(0.95) translateY(10px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        }
      },
      animation: {
        'backdrop': 'modalBackdrop 0.2s ease-out forwards',
        'modal-pop': 'modalPop 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      }
    },
  },
  plugins: [],
}