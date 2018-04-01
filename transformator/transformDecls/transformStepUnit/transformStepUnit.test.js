const run = require('../../../helpersForTests/run');
const { userConfig } = require('../../../helpersForTests/mocks');

describe('transformator', () => {
  describe('transform step unit function', () => {
    it('should transform from step to rem if @t-above atrule is set.', () => {
      const source = `
        .test {
          @t-above(desktop) {
            font-size: 2step;
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

    it('should transform step to rem if @t-below is set.', () => {
      const source = `
        .test {
          @t-below(desktop) {
            font-size: 2step;
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

    it('should transform step to rem if @t-only is set.', () => {
      const source = `
        .test {
          @t-only(desktop) {
            font-size: 2step;
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
