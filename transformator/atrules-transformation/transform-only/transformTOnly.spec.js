import { run, userConfig } from '@helpers-for-tests';

describe('transformator', () => {
  describe('@t-only atrule', () => {
    it('should replace @t-only(desktop) with @media (min-width: 48em) and (max-width: 61.99875em)', () => {
      const source = `
        .test {
          @t-only (desktop) {
            background-color: rebeccapurple;
          }
        }`;

      const compiled = `
        @media (min-width: 48em) and (max-width: 61.99875em) {
    .test {
        background-color: rebeccapurple;
    }
}`;

      return run(source, compiled, userConfig);
    });
  });

  describe('@t-only atrule with orientation', () => {
    it('should replace @t-only(desktop):landscape with @media (min-width: 48em) and (max-width: 61.99875em) and (orientation: landscape)', () => {
      const source = `
        .test {
          @t-only (desktop):landscape {
            background-color: rebeccapurple;
          }
        }`;

      const compiled = `
        @media (min-width: 48em) and (max-width: 61.99875em) and (orientation: landscape) {
    .test {
        background-color: rebeccapurple;
    }
}`;

      return run(source, compiled, userConfig);
    });

    it('should replace @t-only(desktop):portrait with @media (min-width: 48em) and (max-width: 61.99875em) and (orientation: portrait)', () => {
      const source = `
        .test {
          @t-only (desktop):portrait {
            background-color: rebeccapurple;
          }
        }`;

      const compiled = `
        @media (min-width: 48em) and (max-width: 61.99875em) and (orientation: portrait) {
    .test {
        background-color: rebeccapurple;
    }
}`;

      return run(source, compiled, userConfig);
    });
  });
});
