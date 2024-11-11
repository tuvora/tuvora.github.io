const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  plugins: [
    autoprefixer({
      overrideBrowserslist: ['> 1%', 'last 4 versions', 'not dead'],
      grid: true
    }),
    cssnano({
      preset: 'default',
    }),
  ],
};
