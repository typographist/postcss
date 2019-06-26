const run = require('../../run');
const { userConfig } = require('../../mocks/user-config');

describe('transform t-step function', () => {
  it('should replace the t-step function with the font size in rem for each breakpoint', () => {
    const source = `
        h1 {
          font-size: step(6);
        }`;

    const compiled = `
        h1 {
          font-size: 2.4rem;
        }
@media  (min-width: 36em) {
          h1 {
                    font-size: 3.238095238095238rem;
          }
}
@media  (min-width: 48em) {
          h1 {
                    font-size: 3.130434782608696rem;
          }
}
@media  (min-width: 62em) {
          h1 {
                    font-size: 4.8rem;
          }
}
@media  (min-width: 75em) {
          h1 {
                    font-size: 4.846153846153846rem;
          }
}`;

    return run(source, compiled, userConfig);
  });
});
