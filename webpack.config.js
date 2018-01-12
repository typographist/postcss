const merge = require('webpack-merge');
const common = require('./config/webpack.common.config.js');
const production = require('./config/webpack.production.config.js');
const development = require('./config/webpack.development.config.js');

const IS_DEVELOPMENT =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

module.exports = IS_DEVELOPMENT
  ? merge([common, development])
  : merge([production, common]);
