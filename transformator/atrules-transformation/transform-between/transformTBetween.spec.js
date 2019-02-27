import { run, userConfig } from '@helpers-for-tests';

describe('transformator', () => {
  describe('@t-between atrule', () => {
    it(
      'should replace @t-between(tablet, desktop) with ' +
        '@media (min-width: 36em) and (max-width: 61.99875em)',
      () => {
        const source = `
          .test {
            @t-between(tablet, desktop) {
                color: hotpink;
            }
          }`;

        const compiled = `
          @media (min-width: 36em) and (max-width: 61.99875em) {
    .test {
        color: hotpink;
    }
}`;
        return run(source, compiled, userConfig);
      },
    );

    it(
      'should replace @t-between(1000px, 2000px) with ' +
        '@media (min-width: 62.5em) and (max-width: 125em)',
      () => {
        const source = `
          .test {
            @t-between(1000px, 2000px) {
              color: hotpink;
            }
          }`;

        const compiled = `
          @media (min-width: 62.5em) and (max-width: 125em) {
    .test {
        color: hotpink;
    }
}`;

        return run(source, compiled, userConfig);
      },
    );

    it(
      'should replace @t-between(30em, 50em) with ' +
        '@media (min-width: 62.5em) and (max-width: 125em)',
      () => {
        const source = `
          .test {
            @t-between(30em, 50em) {
              color: hotpink;
            }
          }`;

        const compiled = `
          @media (min-width: 30em) and (max-width: 50em) {
    .test {
        color: hotpink;
    }
}`;

        return run(source, compiled, userConfig);
      },
    );
  });

  describe('@t-between atrule with orientation', () => {
    it(
      'should replace @t-between(30em, 50em):landscape with ' +
        '@media (min-width: 62.5em) and (max-width: 125em) and (orientation: landscape)',
      () => {
        const source = `
          .test {
            @t-between(30em, 50em):landscape {
              color: hotpink;
            }
          }`;

        const compiled = `
          @media (min-width: 30em) and (max-width: 50em) and (orientation: landscape) {
    .test {
        color: hotpink;
    }
}`;

        return run(source, compiled, userConfig);
      },
    );

    it(
      'should replace @t-between(30em, 50em):portrait with ' +
        '@media (min-width: 62.5em) and (max-width: 125em) and (orientation: portrait)',
      () => {
        const source = `
          .test {
            @t-between(30em, 50em):portrait {
              color: hotpink;
            }
          }`;

        const compiled = `
          @media (min-width: 30em) and (max-width: 50em) and (orientation: portrait) {
    .test {
        color: hotpink;
    }
}`;

        return run(source, compiled, userConfig);
      },
    );
  });
});
