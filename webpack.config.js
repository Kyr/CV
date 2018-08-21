const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const getContent = require('./scripts/content');

module.exports = {
  // entry: './src/index.js',
  output: {
    // filename: 'index.js',
    path: resolve(__dirname, 'docs'),
  },
  devServer: {
    contentBase: './docs',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: false,
      // content: 'Hello world',
      templateParameters: {
        content: getContent(resolve(__dirname, 'README.md')),
      }
    })
  ]
};
