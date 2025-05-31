/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: [
    './css/app.css',
    './src/**/*.{vue,js,ts,jsx,tsx,json}',
    './public/json/**/*.json',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        ...defaultTheme.colors,
        // Custom colors
        myPrimaryBrandColor: '#000000',
        myPrimaryLinkColor: '#16a34a',
        // gray colors
        myPrimaryLightGrayColor: '#eff2f6',
        // for myPrimaryTag
        myPrimaryLightMediumGrayColor: '#dee6f0',

        // just a dark gray color
        myPrimaryMediumGrayColor: '#9ca3af',

        // use as black color
        myPrimaryDarkGrayColor: '#111827',

        myPrimaryErrorColor: '#d60000',
        myPrimarySuccesColor: '#16a34a',
      },
      fontFamily: {
        sans: [
          'Jost',
          'Raleway',
          "'Cormorant'",
          'sans-serif',
          ...defaultTheme.fontFamily.sans,
        ],
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
