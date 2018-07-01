const { DefinePlugin, HotModuleReplacementPlugin } = require('webpack');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const { PATH } = require('./constants');

module.exports = {
  mode: 'development',
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
    overlay: true,
    port: 3000,
    hot: true,
    stats: {
      'errors-only': true,
    },
    historyApiFallback: true,
  },
  plugins: [
    new DefinePlugin({
      NODE_ENV: JSON.stringify('development'),
    }),
    new HotModuleReplacementPlugin(),
    new FaviconsWebpackPlugin({
      logo: PATH.favicon,
      prefix: 'img/icons/',
      emitStats: false,
      statsFilename: 'iconstats.json',
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
              name: 'img/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
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
        ],
      },
    ],
  },
};
