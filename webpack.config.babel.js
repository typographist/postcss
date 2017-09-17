import merge from 'webpack-merge';
import common from './config/webpack.common';
import production from './config/webpack.production';
import development from './config/webpack.development';

const IS_DEVELOPMENT = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export default IS_DEVELOPMENT ? merge([common, development]) : merge([production, common]);
