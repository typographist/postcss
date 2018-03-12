const buble = require('rollup-plugin-buble');
const commonjs = require('rollup-plugin-commonjs');
const replace = require('rollup-plugin-replace');
const resolve = require('rollup-plugin-node-resolve');
const sass = require('rollup-plugin-sass');
const serve = require('rollup-plugin-serve');

module.exports = {
  input: './src/components/RhythmToggleButton/index.js',
  output: {
    file: './src/bundle.js',
    format: 'umd',
    name: 'RhythmToggleButton',
  },
  plugins: [
    buble({
      exclude: ['**.scss', 'node_modules/**'],
    }),
    commonjs(),
    resolve(),
    serve('src'),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    sass({
      output: './src/main.css',
    }),
  ],
};
