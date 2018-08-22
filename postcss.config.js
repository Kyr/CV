module.exports = ctx => ({
  // parser: ctx.parser ? 'sugarss' : false,
  plugins: {
    'autoprefixer': {
      grid: true,
    },
    'postcss-nested': {},
  /*
      'postcss-import': {},
      'postcss-preset-env': {},
      'cssnano': {}
  */
    }
});
