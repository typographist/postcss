import path from 'path';
import HappyPack from 'happypack';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const happyThreadPool = HappyPack.ThreadPool({ size: 5 });

export default {
  entry: ['babel-polyfill', path.join(__dirname, '..', '/index')],
  watchOptions: {
    argregateTimeout: 100,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['happypack/loader?id=js'],
      },
    ],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      title: 'Page',
      template: path.join(__dirname, '..', '_src', 'index.html'),
      filename: path.join(__dirname, '..', '_dist', 'index.html'),
    }),
    new HappyPack({
      id: 'js',
      threadPool: happyThreadPool,
      loaders: [{
        loader: 'babel-loader',
        query: {
          presets: ['react', 'env', 'stage-0'],
        },
      }],
    }),
  ],
};
