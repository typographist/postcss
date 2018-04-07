const autoprefixer = require('autoprefixer');
const short = require('postcss-short');
const flexbugs = require('postcss-flexbugs-fixes');
const customSelectors = require('postcss-custom-selectors');
const selectorNot = require('postcss-selector-not');
const { browsers } = require('./webpack.options');

module.exports = () => ({
  plugins: [
    autoprefixer({
      browsers,
    }),
    short,
    flexbugs,
    customSelectors,
    selectorNot,
  ],
});
