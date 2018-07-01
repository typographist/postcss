const { NoEmitOnErrorsPlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { PATH } = require('./constants');

module.exports = {
  context: PATH.src,
  entry: {
    common: './common.js',
    home: './index.js',
  },
  resolve: {
    extensions: ['.js', '.css'],
  },
  plugins: [
    new NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'Index',
      template: `${PATH.src}/index.html`,
      chunks: ['common', 'home'],
      filename: 'index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg|woff|woff2)$/,
        use: 'url-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
};
