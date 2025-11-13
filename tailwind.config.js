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
          50: '#fef3e7',
          100: '#fde0bc',
          200: '#fccc91',
          300: '#fbb866',
          400: '#faa43b',
          500: '#f9ab00',
          600: '#e09100',
          700: '#c77700',
          800: '#ae5d00',
          900: '#954300',
        },
        firebase: {
          orange: '#f9ab00',
          yellow: '#ffca28',
          blue: '#039be5',
          navy: '#1a237e',
          purple: '#4a148c',
        },
        dark: {
          50: '#f5f5f5',
          100: '#e8eaed',
          200: '#dadce0',
          300: '#bdc1c6',
          400: '#9aa0a6',
          500: '#5f6368',
          600: '#3c4043',
          700: '#303134',
          800: '#202124',
          900: '#171717',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
