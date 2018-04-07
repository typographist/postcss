const { join } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { browsers, cssModulesHash } = require('./webpack.options');
const createHappyPackPlugin = require('./helpers/happypack');
const { happypackLoaderJs } = require('./webpack.options');

const PATH = {
  src: join(__dirname, '..', 'src'),
};

module.exports = {
  entry: {
    bundle: ['babel-polyfill', `${PATH.src}/index`],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'Index',
      template: `${PATH.src}/index.html`,
      filename: 'index.html',
      chunks: ['common', 'bundle'],
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: 2,
    }),
    createHappyPackPlugin('js', [
      {
        loader: 'babel-loader',
        query: {
          presets: [
            [
              'env',
              {
                targets: browsers,
              },
            ],
            'stage-0',
            'react',
          ],
          plugins: [
            'react-hot-loader/babel',
            [
              'react-css-modules',
              {
                generateScopedName: cssModulesHash,
                filetypes: {
                  '.scss': {
                    syntax: 'postcss-scss',
                  },
                },
                webpackHotModuleReloading: true,
              },
            ],
          ],
        },
      },
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        loader: happypackLoaderJs,
      },
    ],
  },
};
