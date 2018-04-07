const { join } = require('path');
const webpack = require('webpack');
const { cssModulesHash } = require('./webpack.options');
const createHappyPackPlugin = require('./helpers/happypack');
const {
  happypackLoaderImages,
  happypackLoaderCss,
  happypackLoaderScss,
} = require('./webpack.options');

const PATH = {
  postcssConfig: join(__dirname, 'postcss.config.js'),
};

module.exports = {
  output: {
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  devtool: 'eval',
  watch: true,
  watchOptions: {
    aggregateTimeout: 100,
  },
  devServer: {
    port: 3000,
    hot: true,
    stats: {
      'errors-only': true,
    },
    historyApiFallback: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify('development'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    createHappyPackPlugin('images', [
      {
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]',
        },
      },
    ]),
    createHappyPackPlugin('css', [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
          modules: true,
          importLoaders: 2,
          localIdentName: cssModulesHash,
          minimize: false,
        },
      },
      'resolve-url-loader',
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          config: {
            path: PATH.postcssConfig,
          },
        },
      },
    ]),
    createHappyPackPlugin('scss', [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
          modules: true,
          importLoaders: 2,
          localIdentName: cssModulesHash,
          minimize: false,
        },
      },
      'resolve-url-loader',
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          config: {
            path: PATH.postcssConfig,
          },
        },
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
          modules: true,
          importLoaders: 2,
          localIdentName: cssModulesHash,
          minimize: false,
        },
      },
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg|woff|woff2)$/,
        loader: happypackLoaderImages,
      },
      {
        test: /\.css$/,
        loader: happypackLoaderCss,
      },
      {
        test: /\.scss$/,
        loader: happypackLoaderScss,
      },
    ],
  },
};
