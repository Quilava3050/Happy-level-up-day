/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      animation: {
        moveRight: 'moveRight 30s linear infinite',
        moveLeft: 'moveLeft 30s linear infinite',
      },
      keyframes: {
        moveRight: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100vw)' },
        },
        moveLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100vw)' },
        },
      }
    },
  },
  plugins: [],
}
