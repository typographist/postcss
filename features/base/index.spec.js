const run = require('../../run');
const { userConfig } = require('../../mocks/user-config');

describe('@base', () => {
  it(
    'should replace @base with css variables with breakpoint values, ' +
      'the font size specified in percent, specify the font size for each breakpoint',
    () => {
      const source = `
          body {
            @base;
          }`;

      const compiled = `
          body {
            font-size: 1.6rem;
            line-height: 2rem;
          }
@media  (min-width: 36em) {
            body {
                        font-size: 1.619047619047619rem;
            }
}
@media  (min-width: 48em) {
            body {
                        font-size: 1.565217391304348rem;
            }
}
@media  (min-width: 62em) {
            body {
                        font-size: 1.6rem;
            }
}
@media  (min-width: 75em) {
            body {
                        font-size: 1.6153846153846154rem;
            }
}`;

      return run(source, compiled, userConfig);
    },
  );
});
