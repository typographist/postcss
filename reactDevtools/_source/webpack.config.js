const merge = require('webpack-merge');
const common = require('./config/webpack.common.js');
const production = require('./config/webpack.production.js');
const development = require('./config/webpack.development.js');

const IS_DEVELOPMENT =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

module.exports = IS_DEVELOPMENT
  ? merge([common, development])
  : merge([production, common]);
