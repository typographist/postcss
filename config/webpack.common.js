import path from 'path';
import webpack from 'webpack';

export default {
  entry: ['babel-polyfill', path.join(__dirname, '..', '/index.js')],
  watchOptions: {
    argregateTimeout: 100,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['env', 'stage-0'],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
};
