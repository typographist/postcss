// const os = require('os');
const { join } = require('path');
const webpack = require('webpack');
const AssetsWebpackPlugin = require('assets-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { cssModulesHash } = require('./webpack.options');
const createHappyPackPlugin = require('./helpers/happypack');
const {
  happypackLoaderImages,
  happypackLoaderCss,
  happypackLoaderScss,
} = require('./webpack.options');

const PATH = {
  src: join(__dirname, '..', 'src'),
  dist: join(__dirname, '..', 'dist'),
  postcssConfig: join(__dirname, 'postcss.config.js'),
};

module.exports = {
  output: {
    path: PATH.dist,
    publicPath: '/',
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
  },
  watch: false,
  devtool: false,
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify('production'),
    }),
    new AssetsWebpackPlugin({
      filename: 'assets.json',
      path: PATH.dist,
    }),
    new ExtractTextPlugin('css/common.[contenthash].css', {
      allChunks: true,
    }),
    new webpack.optimize.UglifyJsPlugin({
      // more info: http://lisperator.net/uglifyjs/compress
      compress: {
        sequences: true, // join consecutive statemets with the “comma operator”
        properties: true, // optimize property access: a["foo"] → a.foo
        dead_code: true, // discard unreachable code
        drop_debugger: true, // discard “debugger” statements
        unsafe: false, // some unsafe optimizations (see below)
        conditionals: true, // optimize if-s and conditional expressions
        comparisons: true, // optimize comparisons
        evaluate: true, // evaluate constant expressions
        booleans: true, // optimize boolean expressions
        loops: true, // optimize loops
        unused: true, // drop unused variables/functions
        hoist_funs: true, // hoist function declarations
        hoist_vars: false, // hoist variable declarations
        if_return: true, // optimize if-s followed by return/continue
        join_vars: true, // join var declarations
        cascade: true, // try to cascade `right` into `left` in sequences
        side_effects: true, // drop side-effect-free statements
        warnings: false, // warn about potentially dangerous optimizations/code
        global_defs: {
          __REACT_HOT_LOADER__: undefined, // eslint-disable-line no-undefined
        },
      },
      sourceMap: false,
      output: {
        comments: false,
      },
      // more options: https://github.com/webpack-contrib/uglifyjs-webpack-plugin
    }),
    createHappyPackPlugin('images', [
      {
        loader: 'file-loader',
        options: {
          name: 'images/[name].[hash:8].[ext]',
        },
      },
    ]),
    createHappyPackPlugin('css', [
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
          modules: true,
          importLoaders: 2,
          localIdentName: cssModulesHash,
          minimize: true,
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
      {
        loader: 'css-loader',
        options: {
          sourceMap: false,
          modules: true,
          importLoaders: 2,
          localIdentName: cssModulesHash,
          minimize: true,
        },
      },
      'resolve-url-loader',
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: false,
          config: {
            path: PATH.postcssConfig,
          },
        },
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: false,
          modules: true,
          importLoaders: 2,
          localIdentName: cssModulesHash,
          minimize: true,
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
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: happypackLoaderCss,
        }),
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: happypackLoaderScss,
        }),
      },
    ],
  },
};
