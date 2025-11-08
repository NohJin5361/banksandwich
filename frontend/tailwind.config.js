/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef5e7',
          100: '#fce8c3',
          200: '#fad89b',
          300: '#f8c973',
          400: '#f6bd55',
          500: '#f4b137',
          600: '#f2a431',
          700: '#ef9429',
          800: '#ed8522',
          900: '#ea6e15',
        },
        secondary: {
          50: '#e8f5f9',
          100: '#c6e6f0',
          200: '#a0d6e6',
          300: '#7ac5dc',
          400: '#5eb8d5',
          500: '#42abcd',
          600: '#3c9fc8',
          700: '#3390c1',
          800: '#2b82ba',
          900: '#1d6cad',
        }
      },
      fontFamily: {
        sans: ['Pretendard', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
