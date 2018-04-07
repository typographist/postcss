const buble = require('rollup-plugin-buble');
const commonjs = require('rollup-plugin-commonjs');
// const multiEntry = require('rollup-plugin-multi-entry');
const replace = require('rollup-plugin-replace');
const resolve = require('rollup-plugin-node-resolve');
const sass = require('rollup-plugin-sass');

module.exports = {
  input: './_source/components/index.js',
  output: {
    file: './index.js',
    format: 'cjs',
  },
  plugins: [
    buble({
      exclude: ['**.scss', 'node_modules/**'],
    }),
    commonjs(),
    resolve(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    sass({
      output: './devtools.css',
    }),
  ],
};
