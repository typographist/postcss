const { join } = require('path');

const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: join(__dirname, '..', 'src/components/ToggleButton'),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Page',
      template: join(__dirname, '..', 'src', 'index.html'),
      filename: join(__dirname, '..', 'dist', 'index.html'),
    }),
  ],
};
