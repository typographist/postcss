const run = require('../../../helpersForTests/run');
const { userConfig } = require('../../../helpersForTests/mocks');

describe('transformator', () => {
  describe('transform ms unit function', () => {
    it('should transform from ms to rem if @t-above atrule is set.', () => {
      const source = `
        .test {
          @t-above(desktop) {
            font-size: 2ms;
          }
        }`;

      const compiled = `
        @media screen and (min-width: 48em) {
    .test {
        font-size: 1.9166666666666667rem;
    }
}`;

      return run(source, compiled, userConfig);
    });

    it('should transform ms to rem if @t-below is set.', () => {
      const source = `
        .test {
          @t-below(desktop) {
            font-size: 2ms;
          }
        }`;

      const compiled = `
        @media screen and (max-width: 61.99875em) {
    .test {
        font-size: 1.9166666666666667rem;
    }
}`;

      return run(source, compiled, userConfig);
    });

    it('should transform ms to rem if @t-only is set.', () => {
      const source = `
        .test {
          @t-only(desktop) {
            font-size: 2ms;
          }
        }`;

      const compiled = `
        @media screen and (min-width: 48em) and (max-width: 61.99875em) {
    .test {
        font-size: 1.9166666666666667rem;
    }
}`;

      return run(source, compiled, userConfig);
    });
  });
});
