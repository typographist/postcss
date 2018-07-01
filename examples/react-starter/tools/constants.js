const { join } = require('path');

const IS_DEVELOPMENT =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const PATH = {
  src: join(__dirname, '..', 'src'),
  public: join(__dirname, '..', 'public'),
  postcssConfig: join(__dirname, 'postcss.config.js'),
  favicon: join(__dirname, '..', 'src', 'favicon.png'),
};

module.exports = { IS_DEVELOPMENT, PATH };
