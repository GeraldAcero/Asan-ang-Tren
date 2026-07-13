/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fffe',
          100: '#e0fffc',
          200: '#b3fff9',
          300: '#85fff6',
          400: '#57fff3',
          500: '#0BA5A1',
          600: '#078A87',
          700: '#046f6b',
          800: '#025450',
          900: '#013935',
        },
        accent: {
          DEFAULT: '#7FFF00',
          light: '#9FFF33',
          dark: '#5FCC00',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
      },
      borderRadius: {
        sm: '6px',
        md: '8px',
        lg: '12px',
      },
      boxShadow: {
        sm: '0 2px 4px rgba(0, 0, 0, 0.05)',
        md: '0 4px 12px rgba(0, 0, 0, 0.1)',
        lg: '0 12px 24px rgba(0, 0, 0, 0.15)',
        primary: '0 4px 20px rgba(11, 165, 161, 0.15)',
      },
    },
  },
  plugins: [],
}
