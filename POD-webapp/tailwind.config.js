import { tailwindColors } from './src/theme/colors.js';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Custom color palette matching Ant Design theme
        primary: {
          DEFAULT: tailwindColors['primary-dark-blue'],
          white: tailwindColors['primary-white'],
          orange: tailwindColors['primary-orange'],
          blue: tailwindColors['primary-blue'],
          'dark-blue': tailwindColors['primary-dark-blue'],
        },
        text: {
          primary: tailwindColors['text-primary'],
          secondary: tailwindColors['text-secondary'],
          muted: tailwindColors['text-muted'],
          inverse: tailwindColors['text-inverse'],
        },
        background: {
          primary: tailwindColors['bg-primary'],
          secondary: tailwindColors['bg-secondary'],
          tertiary: tailwindColors['bg-tertiary'],
          dark: tailwindColors['bg-dark'],
        },
        border: {
          light: tailwindColors['border-light'],
          medium: tailwindColors['border-medium'],
          dark: tailwindColors['border-dark'],
        },
        success: tailwindColors.success,
        warning: tailwindColors.warning,
        error: tailwindColors.error,
        info: tailwindColors.info,
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
      fontSize: {
        'heading-1': ['32px', { lineHeight: '1.2', fontWeight: '600' }],
        'heading-2': ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        'heading-3': ['20px', { lineHeight: '1.4', fontWeight: '600' }],
        'heading-4': ['18px', { lineHeight: '1.4', fontWeight: '600' }],
        'heading-5': ['16px', { lineHeight: '1.4', fontWeight: '600' }],
      },
      borderRadius: {
        xs: '4px',
        sm: '6px',
        DEFAULT: '8px',
        lg: '12px',
      },
      boxShadow: {
        soft: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        medium: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        large: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      spacing: {
        18: '4.5rem',
        72: '18rem',
        84: '21rem',
        96: '24rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
