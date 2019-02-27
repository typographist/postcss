import { run, userConfig } from '@helpers-for-tests';

describe('transformator', () => {
  describe('@t-below atrule', () => {
    it('should replace @t-below(desktop) with @media (min-width: 61.99875em)', () => {
      const source = `
          .test {
            @t-below (desktop) {
              background-color: gold;
              }
          }`;

      const compiled = `
          @media (max-width: 61.99875em) {
    .test {
        background-color: gold;
    }
}`;

      return run(source, compiled, userConfig);
    });

    it('should replace @t-below(1000px) with @media (min-width: 62.5em)', () => {
      const source = `
          .test {
            @t-below (1000px) {
              background-color: gold;
              }
          }`;

      const compiled = `
          @media (max-width: 62.5em) {
    .test {
        background-color: gold;
    }
}`;

      return run(source, compiled, userConfig);
    });

    it('should replace @t-below(40em) with @media (min-width: 40em)', () => {
      const source = `
          .test {
            @t-below (40em) {
              background-color: gold;
              }
          }`;

      const compiled = `
          @media (max-width: 40em) {
    .test {
        background-color: gold;
    }
}`;

      return run(source, compiled, userConfig);
    });
  });

  describe('@t-below atrule with orientation', () => {
    it('should replace @t-below(desktop):landscape with @media (min-width: 61.99875em) and (orientation: landscape)', () => {
      const source = `
            .test {
              @t-below (desktop):landscape {
                background-color: gold;
                }
            }`;

      const compiled = `
            @media (max-width: 61.99875em) and (orientation: landscape) {
    .test {
        background-color: gold;
    }
}`;

      return run(source, compiled, userConfig);
    });

    it('should replace @t-below(desktop):portrait with @media (min-width: 61.99875em) and (orientation: portrait)', () => {
      const source = `
            .test {
              @t-below (desktop):portrait {
                background-color: gold;
                }
            }`;

      const compiled = `
            @media (max-width: 61.99875em) and (orientation: portrait) {
    .test {
        background-color: gold;
    }
}`;

      return run(source, compiled, userConfig);
    });
  });
});
