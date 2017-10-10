import path from 'path';
import HappyPack from 'happypack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const happyThreadPool = HappyPack.ThreadPool({ size: 5 });

export default {
  output: {
    path: path.join(__dirname, '..', '_dist'),
    filename: 'new-typography.js',
  },
  watch: true,
  devtool: 'cheap-module-inline-source-map',
  devServer: {
    port: 3000,
    hot: true,
    stats: {
      colors: true,
      chunks: false,
      'errors-only': true,
    },
  },
  plugins: [
    new HappyPack({
      id: 'css',
      threadPool: happyThreadPool,
      loaders: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            config: {
              path: path.join(__dirname, 'postcss.config.js'),
              ctx: {
                autoprefixer: {
                  browsers: ['last 2 version', '> 5%'],
                },
                flexbugsFixes: {},
                short: {},
                cssnano: {},
              },
            },
          },
        },
        'resolve-url-loader',
      ],
    }),
    new HappyPack({
      id: 'scss',
      threadPool: happyThreadPool,
      loaders: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            config: {
              path: path.join(__dirname, 'postcss.config.js'),
              ctx: {
                autoprefixer: {
                  browsers: ['last 2 version', '> 5%'],
                },
                flexbugsFixes: {},
                short: {},
                cssnano: {},
              },
            },
          },
        },
        'resolve-url-loader',
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        },
      ],
    }),
    new HappyPack({
      id: 'images',
      threadPool: happyThreadPool,
      loaders: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
      ],
    }),
    new ExtractTextPlugin('[name].css', {
      allChunks: true,
      disable: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['happypack/loader?id=css'],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['happypack/loader?id=scss'],
      },
      {
        test: /\.(png|jpg|gif|svg|woff|woff2)$/,
        use: ['happypack/loader?id=images'],
      },
    ],
  },
};
