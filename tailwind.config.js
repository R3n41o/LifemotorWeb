/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F7C71A',
        secondary: '#FFCB05',
        background: '#E0E0E0',
        'text-primary': 'rgb(29 32 35 / 0.87)',
        'text-secondary': 'rgb(29 32 35 / 0.54)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};