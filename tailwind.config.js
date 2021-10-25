module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      outline: {
        indigo: '1px solid #6f00ff'
      }
    },
  },
  variants: {
    extend: {
      outline: ['hover', 'active']
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
