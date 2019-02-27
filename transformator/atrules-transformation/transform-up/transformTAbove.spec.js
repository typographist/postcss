import { run, userConfig } from '@helpers-for-tests';

describe('transformator', () => {
  describe('@t-above atrule', () => {
    it('should replace @t-above(desktop) with @media (min-width: 48em)', () => {
      const source = `
        .test {
          @t-above(desktop) {
            background-color: orange;
          }
        }`;

      const compiled = `
        @media (min-width: 48em) {
    .test {
        background-color: orange;
    }
}`;
      return run(source, compiled, userConfig);
    });

    it('should replace @t-above(1000px) with @media (min-width: 62.5em)', () => {
      const source = `
        .test {
          @t-above(1000px) {
            background-color: orange;
          }
        }`;

      const compiled = `
        @media (min-width: 62.5em) {
    .test {
        background-color: orange;
    }
}`;
      return run(source, compiled, userConfig);
    });

    it('should replace @t-above(40em) with @media (min-width: 40em)', () => {
      const source = `
        .test {
          @t-above(40em) {
            background-color: orange;
          }
        }`;

      const compiled = `
        @media (min-width: 40em) {
    .test {
        background-color: orange;
    }
}`;
      return run(source, compiled, userConfig);
    });
  });

  describe('@t-above atrule with orientation', () => {
    it('should replace @t-above(40em):landscape with @media (min-with: 40em) and (orientation: landscape)', () => {
      const source = `
      .test {
        @t-above(40em):landscape {
          background-color: orange;
        }
      }`;

      const compiled = `
      @media (min-width: 40em) and (orientation: landscape) {
    .test {
        background-color: orange;
    }
}`;

      return run(source, compiled, userConfig);
    });

    it('should replace @t-above(40em):portrait with @media (min-with: 40em) and (orientation: portrait)', () => {
      const source = `
      .test {
        @t-above(40em):portrait {
          background-color: orange;
        }
      }`;

      const compiled = `
      @media (min-width: 40em) and (orientation: portrait) {
    .test {
        background-color: orange;
    }
}`;

      return run(source, compiled, userConfig);
    });
  });
});
