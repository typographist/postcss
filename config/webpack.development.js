import path from 'path';

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
};
