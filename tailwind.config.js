// tailwind.config.js
const plugin = require('tailwindcss/plugin');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            fontFamily: ['Poppins', ...defaultTheme.fontFamily.sans],
          },
        },
      },
      colors: {
        primary_hard: '#5a5fed',
        primary_dark: '#202445',
        regal_blue: '#272d4d',
        secondary_dark: '#333a65',
        primary: '#6366F1', // Indigo
        secondary: '#1E293B', // Dark Background
        accent: '#60A5FA',
        primary_gray: 'rgb(148 163 184)',
        dark: {
          400: '#464f8b',
          600: '#333a65',
          900: '#272d4d',
        },
        white: '#fff',
        primary: {
          gray: {
            100: '#545a84',
            900: 'rgb(17 24 39)',
          },
          blue: {
            400: '#7060ff',
            600: '#5a5fed',
            900: '#464aba',
          },
          green: {
            100: '#76eb11',
            400: '#5ba41c',
            600: '#24aeb1',
          },
          red: {
            100: '#ffafbe',
            400: '#ff5776',
            600: '#f6547d',
            900: '#ff5776',
          },
          sky: {
            100: 'rgb(77 143 182 / 40%)',
            400: '#73e5ff',
            600: '#69d9e8',
          },
          text: {
            100: '#9094b5',
          },
        },
      },
    },
  },

  plugins: [
    require('tailwind-scrollbar'),
    require('@tailwindcss/typography'),
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-thumb-hover-green': {
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#10b981',
          },
        },
      });
    }),
  ],
};
