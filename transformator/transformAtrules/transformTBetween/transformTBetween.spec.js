const run = require('../../../helpersForTests/run');
const { userConfig } = require('../../../helpersForTests/mocks');

describe('transformator', () => {
  describe('@t-between', () => {
    it(
      'should replace @t-between(tablet, desktop) with ' +
        '@media screen and (min-width: 36em) and (max-width: 61.99875em)',
      () => {
        const source = `
          .test {
            @t-between(tablet, desktop) {
                color: hotpink;
            }
          }`;

        const compiled = `
          @media screen and (min-width: 36em) and (max-width: 61.99875em) {
    .test {
        color: hotpink;
    }
}`;
        return run(source, compiled, userConfig);
      },
    );

    it(
      'should replace @t-between(1000px, 2000px) with ' +
        '@media screen and (min-width: 62.5em) and (max-width: 125em)',
      () => {
        const source = `
          .test {
            @t-between(1000px, 2000px) {
              color: hotpink;
            }
          }`;

        const compiled = `
          @media screen and (min-width: 62.5em) and (max-width: 125em) {
    .test {
        color: hotpink;
    }
}`;

        return run(source, compiled, userConfig);
      },
    );

    it(
      'should replace @t-between(30em, 50em) with ' +
        '@media screen and (min-width: 62.5em) and (max-width: 125em)',
      () => {
        const source = `
          .test {
            @t-between(30em, 50em) {
              color: hotpink;
            }
          }`;

        const compiled = `
          @media screen and (min-width: 30em) and (max-width: 50em) {
    .test {
        color: hotpink;
    }
}`;

        return run(source, compiled, userConfig);
      },
    );
  });
});
