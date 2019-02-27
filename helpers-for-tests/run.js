import postcss from 'postcss';

const { typographist } = require('../');

export const run = (input, output, config) =>
  postcss([typographist(config)])
    .process(input)
    .then((result) => {
      expect(result.css).toEqual(output);
      expect(result.warnings().length).toBe(0);
    });
