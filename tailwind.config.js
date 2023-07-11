/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        allrox: ['var(--font-allrox)'],
        geologica: ['var(--font-geologica)'],
      },
      spacing: {
        '120': '30rem',
        '128': '32rem',
        '144': '36rem'
      },
      colors: {
        'brand': {
          DEFAULT: '#0D0E2B',
          50: '#383CB8',
          100: '#3337A8',
          200: '#292D89',
          300: '#20226A',
          400: '#16184A',
          500: '#0D0E2B',
          600: '#000000',
          700: '#000000',
          800: '#000000',
          900: '#000000',
          950: '#000000'
        },
        'clay': {
          DEFAULT: '#996633',
          50: '#E0C2A3',
          100: '#DBB894',
          200: '#D1A375',
          300: '#C78F57',
          400: '#B87A3D',
          500: '#996633',
          600: '#6F4A25',
          700: '#452E17',
          800: '#1B1209',
          900: '#000000',
          950: '#000000'
        },
        'dodger-blue': {
          DEFAULT: '#4472FF', 50: '#FCFCFF', 100: '#E7EDFF', 200: '#BECEFF', 300: '#96B0FF', 400: '#6D91FF', 500: '#4472FF', 600: '#0C48FF', 700: '#0034D3', 800: '#00269B', 900: '#001863', 950: '#001147'
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}