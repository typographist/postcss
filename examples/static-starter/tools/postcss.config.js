const autoprefixer = require('autoprefixer');
const short = require('postcss-short');
const flexbugs = require('postcss-flexbugs-fixes');
const customSelectors = require('postcss-custom-selectors');
const selectorNot = require('postcss-selector-not');
const cssImport = require('postcss-import');
const { typographist, ratios } = require('typographist');

module.exports = () => ({
  plugins: [
    autoprefixer,
    short,
    flexbugs,
    customSelectors,
    selectorNot,
    cssImport,
    typographist({
      base: '16px',
      lineHeight: 1.5,
      ratio: ratios.MINOR_SECOND,
      tablet: {
        breakpoint: '768px',
        base: '17px',
        ratio: ratios.MAJOR_SECOND,
      },
      desktop: {
        breakpoint: '992px',
        base: '19px',
        ratio: ratios.MINOR_THIRD,
      },
      lgDesktop: {
        breakpoint: '1200px',
        base: '21px',
      },
    }),
  ],
});
