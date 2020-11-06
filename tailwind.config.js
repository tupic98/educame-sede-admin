module.exports = {
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#F4F9FF',
          100: '#E6F2FF',
          200: '#C0DFFF',
          300: '#9BCCFF',
          400: '#4FA5FF',
          500: '#047FFF',
          600: '#0472E6',
          700: '#024C99',
          800: '#023973',
          900: '#01264D',
        },
        'dark-blue': {
          50: '#F4F4F4',
          100: '#EAEAEC',
          200: '#CBCBD1',
          300: '#ABABB5',
          400: '#6C6C7D',
          500: '#2D2D45',
          600: '#29293E',
          700: '#1B1B29',
          800: '#14141F',
          900: '#0E0E15',
        },
      },
      width: {
        25: '6.1rem',
      },
    },
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'group-hover', 'odd'],
    borderWidth: ['responsive', 'first', 'hover', 'focus'],
  },
  plugins: [
    // eslint-disable-next-line global-require
    require('@tailwindcss/ui'),
  ],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './public/**/*.html',
      './src/**/*.vue',
      './src/**/*.js',
    ],
  },
};
