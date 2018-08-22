const {resolve}         = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const getContent        = require('./scripts/content');

module.exports = {
  entry:     [
    './src/index.js',
    // './src/style.scss',
  ],
  output:    {
    filename: '[name].js',
    path: resolve(__dirname, 'docs'),
  },
  devServer: {
    contentBase: './docs',
  },
  plugins:   [
    new HtmlWebpackPlugin({
      template:           './src/index.html',
      // inject:             false,
      // content: 'Hello world',
      templateParameters: {
        content: getContent(resolve(__dirname, 'README.md')),
      },
    }),
  ],
  module:    {
    rules: [
      {
        test: /\.scss$/,
        use:  [
          'style-loader',
          {
            loader:  'css-loader',
            options: {
              // modules:        true,
              // localIdentName: '[local]--[hash:base64:5]',
              importLoaders:  1,
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },
};
