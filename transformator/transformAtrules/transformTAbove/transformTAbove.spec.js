const run = require('../../../helpersForTests/run');
const { userConfig } = require('../../../helpersForTests/mocks');

describe('transformator', () => {
  describe('@t-above', () => {
    it('should replace @t-above(desktop) with @media screen and (min-width: 48em)', () => {
      const source = `
        .test {
          @t-above(desktop) {
            background-color: orange;
          }
        }`;

      const compiled = `
        @media screen and (min-width: 48em) {
    .test {
        background-color: orange;
    }
}`;
      return run(source, compiled, userConfig);
    });

    it('should replace @t-above(1000px) with @media screen and (min-width: 62.5em)', () => {
      const source = `
        .test {
          @t-above(1000px) {
            background-color: orange;
          }
        }`;

      const compiled = `
        @media screen and (min-width: 62.5em) {
    .test {
        background-color: orange;
    }
}`;
      return run(source, compiled, userConfig);
    });

    it('should replace @t-above(40em) with @media screen and (min-width: 40em)', () => {
      const source = `
        .test {
          @t-above(40em) {
            background-color: orange;
          }
        }`;

      const compiled = `
        @media screen and (min-width: 40em) {
    .test {
        background-color: orange;
    }
}`;
      return run(source, compiled, userConfig);
    });
  });
});
