const url = require('postcss-url');
const cssImport = require('postcss-import');
const autoprefixer = require('autoprefixer');
const { typographist, ratios } = require('typographist');

module.exports = () => ({
  plugins: [
    url,
    cssImport,
    autoprefixer,
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
