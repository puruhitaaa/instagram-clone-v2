module.exports = {
  mode: 'jit',
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fill: (theme) => ({
        red: theme('colors.red.primary'),
      }),
      colors: {
        white: '#fff',
        blue: {
          medium: '#005c98',
        },
        black: {
          light: '#262626',
          faded: '#00000059',
        },
        gray: {
          base: '#616161',
          background: '#fafafa',
          primary: '#dbdbdb',
        },
        red: {
          primary: '#ed4956',
        },
      },
    },
  },
  variants: {
    display: ['group-hover'],
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar'),
    require('tailwind-scrollbar-hide'),
  ],
};
