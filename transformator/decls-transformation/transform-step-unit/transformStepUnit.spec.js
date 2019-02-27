import { run, userConfig } from '@helpers-for-tests';

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
        @media (min-width: 48em) {
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
        @media (max-width: 61.99875em) {
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
        @media (min-width: 48em) and (max-width: 61.99875em) {
    .test {
        font-size: 1.9166666666666667rem;
    }
}`;

      return run(source, compiled, userConfig);
    });
  });
});
