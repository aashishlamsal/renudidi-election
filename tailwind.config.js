/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'didi-red': '#FF0000',
        'didi-gold': '#FFC700',
        'didi-black': '#0B0B0F',
        'didi-gray': '#F4F4F6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        nepali: ['Noto Sans Devanagari', 'Mukta', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        'container': '1280px',
      },
      spacing: {
        'section': '80px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(255, 199, 0, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(255, 199, 0, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}
