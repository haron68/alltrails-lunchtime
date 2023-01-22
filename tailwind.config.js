/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'blue': '#1fb6ff',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
      'white': '#ffffff',
      'black': '#000000',
      primary: {
        100: '#41f31c',
        200: '#28e713',
        300: '#35bf16',
        400: '#2cbc11',
        500: '#12b600',
        600: '#1b9200',
        700: '#146d00',
        800: '#024900',
        900: '#0d2400',
        DEFAULT: '#12b600',
      },
      secondary: {
        100: '#00e1ff',
        200: '#02b2e5',
        300: '#019fde',
        400: '#0085e2',
        500: '#006bb6',
        600: '#005692',
        700: '#00406d',
        800: '#002b49',
        900: '#001524',
        DEFAULT: '#006BB6',
      },
      muted: {
        100: '#f2f2f3',
        200: '#e5e6e7',
        300: '#d8d9da',
        400: '#cbcdce',
        500: '#BEC0C2',
        600: '#989a9b',
        700: '#727374',
        800: '#4c4d4e',
        900: '#262627',
        DEFAULT: '#BEC0C2',
      },
      danger: {
        100: '#f4ced4',
        200: '#e99caa',
        300: '#df6b7f',
        400: '#d43955',
        500: '#c9082a',
        600: '#a10622',
        700: '#790519',
        800: '#500311',
        900: '#280208',
        DEFAULT: '#E61E4D',
      },
    },
    fontFamily: {
      sans: ['Manrope', 'sans-serif'],
      serif: ['Manrope', 'serif'],
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
