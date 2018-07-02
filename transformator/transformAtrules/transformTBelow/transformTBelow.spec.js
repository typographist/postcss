const run = require('../../../helpersForTests/run');
const { userConfig } = require('../../../helpersForTests/mocks');

describe('transformator', () => {
  describe('@t-below', () => {
    it('should replace @t-below(desktop) with @media screen and (min-width: 61.99875em)', () => {
      const source = `
          .test {
            @t-below (desktop) {
              background-color: gold;
              }
          }`;

      const compiled = `
          @media screen and (max-width: 61.99875em) {
    .test {
        background-color: gold;
    }
}`;

      return run(source, compiled, userConfig);
    });

    it('should replace @t-below(1000px) with @media screen and (min-width: 62.5em)', () => {
      const source = `
          .test {
            @t-below (1000px) {
              background-color: gold;
              }
          }`;

      const compiled = `
          @media screen and (max-width: 62.5em) {
    .test {
        background-color: gold;
    }
}`;

      return run(source, compiled, userConfig);
    });

    it('should replace @t-below(40em) with @media screen and (min-width: 40em)', () => {
      const source = `
          .test {
            @t-below (40em) {
              background-color: gold;
              }
          }`;

      const compiled = `
          @media screen and (max-width: 40em) {
    .test {
        background-color: gold;
    }
}`;

      return run(source, compiled, userConfig);
    });
  });
});
