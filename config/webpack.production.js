import path from 'path';
// import fs from 'fs';

// let nodeModules = {};

// fs.readdirSync('node_modules')
//   .filter(function(x) {
//     return ['.bin'].indexOf(x) === -1;
//   })
//   .forEach(function(mod) {
//     nodeModules[mod] = 'commonjs ' + mod;
//   });

export default {
  output: {
    path: path.join(__dirname, '..', '_dist'),
    // libratyTarget: 'umd',
    filename: 'new-typography.js',
  },
  devtool: false,
  // externals: nodeModules,
};
