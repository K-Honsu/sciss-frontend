/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        'manrope': ['Manrope']
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        dark: {
          '400': '#656673',
          '500': '#4B5563',
          '600': '#3F3F50',
          '700': '#1A1B1C',
          '800': '#0D0C22'
        },
        primary: {
          DEFAULT: '#009254',
          '100': '#64BD87',
          '200': '#CAEAD4',
          '300': '#EBF6F9',
          dark: '#006F37',
          darker: '#003A1B'
        },
        neutral: {
          DEFAULT: '#D6D3D1',
          '100': '#FBFBFB'
        },
        white: '#FFFFFF'
      },
    },
  },
  plugins: [],
}

