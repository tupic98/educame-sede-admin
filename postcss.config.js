// eslint-disable-next-line @typescript-eslint/no-var-requires,import/no-extraneous-dependencies
const autoprefixer = require('autoprefixer');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const tailwindcss = require('tailwindcss');

module.exports = {
  plugins: [
    tailwindcss,
    autoprefixer,
  ],
};
