/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        subtle: '2px 3px 7px 2px rgba(0,0,0,0.02)'
      },
      zIndex: {
        max: 9999
      },
      colors: {
        brand: '#BC2090'
      }
    }
  },
  plugins: []
}
