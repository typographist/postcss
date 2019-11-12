const postcss = require('postcss');
const { typographist } = require('.');

module.exports = (input, output, config) =>
  postcss([typographist(config)])
    .process(input, { from: undefined })
    .then((result) => {
      expect(result.css).toEqual(output);
      expect(result.warnings().length).toBe(0);
    });
