const { DefinePlugin, IgnorePlugin } = require('webpack');
const AssetsWebpackPlugin = require('assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const { PATH } = require('./constants');

module.exports = {
  mode: 'production',
  output: {
    path: PATH.public,
    publicPath: '/',
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
  },
  performance: {
    hints: false,
  },
  watch: false,
  devtool: false,
  plugins: [
    new DefinePlugin({
      NODE_ENV: JSON.stringify('production'),
    }),
    new AssetsWebpackPlugin({
      filename: 'assets.json',
      path: PATH.public,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/main.[contenthash].css',
    }),
    new IgnorePlugin(/typographist-static-devtools\/devtools\.css/),
    new IgnorePlugin(/typographist-static-devtools/),
    new FaviconsWebpackPlugin({
      logo: PATH.favicon,
      prefix: 'img/icons/',
      emitStats: false,
      statsFilename: 'iconstats-[hash].json',
      background: '#fff',
      persistentCache: true,
      inject: true,
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false,
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
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
        ],
      },
    ],
  },
};
