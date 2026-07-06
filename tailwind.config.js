/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './lib/**/*.{js,jsx,ts,tsx}',
    './utils/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        accent: '#7c3aed',
        mint: '#14b8a6'
      },
      boxShadow: {
        glow: '0 0 40px rgba(124, 58, 237, 0.25)'
      }
    }
  },
  plugins: []
};
