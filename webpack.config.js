const {resolve}            = require('path');
const HtmlWebpackPlugin    = require('html-webpack-plugin');
const CopyWebpackPlugin    = require('copy-webpack-plugin');
const CleanWebpackPlugin   = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin        = require('workbox-webpack-plugin');

const getContent   = require('./scripts/content');
const fallbackArgv = {mode: 'development'}; // to allow webStorm to parse config

module.exports = (env, argv = fallbackArgv) => {
  const prodMode = argv.mode === 'production';

  return {
    entry:     [
      './src/index.js',
      // style: './src/style.scss',
    ],
    /*
        entry:     {
          app:   './src/index.js',
          style: './src/style.scss',
        },
    */
    output:    {
      filename: '[name].[hash].js',
    },
    devServer: {
      contentBase: './docs',
    },
    plugins:   [
      new CleanWebpackPlugin(['dist/*.*']),
      new HtmlWebpackPlugin({
        template:           './src/index.html',
        // chunks:             ['app'],
        // inject:             false,
        templateParameters: {
          content: getContent(resolve(__dirname, 'README.md')),
        },
      }),
      new CopyWebpackPlugin([
        {
          from:   'assets/photo/',
          to:     'assets/photo/',
          toType: 'dir',
          /*
                // TODO
                transform (content, path) {
                  return optimize(content)
                // or
                  return responsive(content, srcset)
                // or composition of above
                }
          */
        },
      ], {/*options*/}),
      new MiniCssExtractPlugin({
        filename:      prodMode ? '[name].[hash].css' : '[name].css',
        chunkFilename: prodMode ? '[id].[hash].css' : '[id].css',
      }),
      new WorkboxPlugin.GenerateSW({
        clientsClaim: true,
        skipWaiting:  true,
      }),
    ],
    module:    {
      rules: [
        {
          test: /\.scss$/,
          use:  [
            prodMode ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader:  'css-loader',
              options: {
                /*
                // TODO: which modules preferred, this one or postCSS?
                              modules:        true,
                              localIdentName: '[local]--[hash:base64:5]',
                */
                importLoaders: 1,
              },
            },
            'postcss-loader',
          ],
        },
      ],
    },
  };
};
