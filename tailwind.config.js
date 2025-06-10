/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B6B',
        secondary: '#4ECDC4',
        accent: '#FFE66D',
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a'
        },
        success: '#95E1D3',
        warning: '#FFA502',
        error: '#EE5A6F',
        info: '#54A0FF'
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui'],
        heading: ['Fredoka One', 'Plus Jakarta Sans', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        '3d': '0 8px 16px rgba(0, 0, 0, 0.15)',
        'hover': '0 12px 24px rgba(0, 0, 0, 0.15)'
      }
    },
  },
  plugins: [],
}