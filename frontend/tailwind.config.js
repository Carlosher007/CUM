/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#BDEB00',
        secondary: {
          100: '#1E1F25',
          200: '#35363d',
          300: '#5c5e69',
          900: '#131517',
        },
        terciary: '#32a852',
        quaternary: '#E57373',
      },
    },
  },
  plugins: [require('@headlessui/tailwindcss')],
};
