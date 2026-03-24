/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#050505',
          charcoal: '#0f0f0f',
          graphite: '#1a1a1a',
          red: '#dc2626',
          crimson: '#b91c1c',
          glow: '#ef4444',
        },
      },
      fontFamily: {
        display: ['Oswald', 'system-ui', 'sans-serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-in-slow': 'fadeIn 1.2s ease-out forwards',
        'slide-up': 'slideUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'logo-pulse': 'logoPulse 2s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
        'line-grow': 'lineGrow 1.4s ease-out forwards',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(32px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        logoPulse: {
          '0%, 100%': { transform: 'scale(1)', filter: 'drop-shadow(0 0 0 transparent)' },
          '50%': { transform: 'scale(1.03)', filter: 'drop-shadow(0 0 20px rgba(220, 38, 38, 0.35))' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        lineGrow: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
