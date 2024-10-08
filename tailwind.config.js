/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'trek-color-1': '#4CA771'
      },
      backgroundImage: {
        'Login-register': "url('./assets/Login-register.png')",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.hide-scrollbar': {
          'scrollbar-width': 'none', /* Firefox */
          '-ms-overflow-style': 'none', /* Internet Explorer and Edge */
        },
        '.hide-scrollbar::-webkit-scrollbar': {
          'display': 'none', /* Chrome, Safari, and Opera */
        },
      });
    },
  ],
}

