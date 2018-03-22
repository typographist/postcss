const run = require('../../../helpersForTests/run');
const { userConfig } = require('../../../helpersForTests/mocks');

describe('transformator', () => {
  describe('transform t-ms function', () => {
    it('should replace the t-ms function with the font size in rem for each breakpoint', () => {
      const source = `
        h1 {
          font-size: t-ms(6);
        }`;
      const compiled = `
        h1 {
          font-size: 2.4rem;
        }
@media  screen and (min-width: 36em) {
          h1 {
                    font-size: 3.090909090909091rem;
          }
}
@media  screen and (min-width: 48em) {
          h1 {
                    font-size: 3rem;
          }
}
@media  screen and (min-width: 62em) {
          h1 {
                    font-size: 4.615384615384615rem;
          }
}
@media  screen and (min-width: 75em) {
          h1 {
                    font-size: 4.846153846153846rem;
          }
}`;

      return run(source, compiled, userConfig);
    });
  });
});
