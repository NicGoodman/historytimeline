module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        signika: "'Signika', sans-serif"
      },
      boxShadow: {
        neumorphismlight:
          '-4px 4px 30px #cdd0d4,4px -4px 30px #ffffff',
          'neumorphismlight-inner': 'inset -5px 5px 15px #cdd0d4, inset 5px -5px 15px rgba(255,255,255,0.75);'
      }
    }
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ]
};