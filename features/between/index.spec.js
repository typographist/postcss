const run = require('../../run');
const { userConfig } = require('../../mocks/user-config');

describe('@between', () => {
  it('should replace @between(tablet, desktop)', () => {
    const source = `
          .test {
            @between(tablet, desktop) {
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
  });

  it('should replace @between(1000px, 2000px)', () => {
    const source = `
          .test {
            @between(1000px, 2000px) {
              color: hotpink;
            }
          }`;

    const compiled = `
          @media (min-width: 62.5em) and (max-width: 124.99875em) {
    .test {
        color: hotpink;
    }
}`;

    return run(source, compiled, userConfig);
  });

  it('should replace @between(30em, 50em)', () => {
    const source = `
          .test {
            @between(30em, 50em) {
              color: hotpink;
            }
          }`;

    const compiled = `
          @media (min-width: 30em) and (max-width: 49.99875em) {
    .test {
        color: hotpink;
    }
}`;

    return run(source, compiled, userConfig);
  });
});

describe('@between atrule with orientation', () => {
  it('should replace @between(30em, 50em):landscape', () => {
    const source = `
          .test {
            @between(30em, 50em):landscape {
              color: hotpink;
            }
          }`;

    const compiled = `
          @media (min-width: 30em) and (max-width: 49.99875em) and (orientation: landscape) {
    .test {
        color: hotpink;
    }
}`;

    return run(source, compiled, userConfig);
  });

  it('should replace @between(30em, 50em):portrait ', () => {
    const source = `
          .test {
            @between(30em, 50em):portrait {
              color: hotpink;
            }
          }`;

    const compiled = `
          @media (min-width: 30em) and (max-width: 49.99875em) and (orientation: portrait) {
    .test {
        color: hotpink;
    }
}`;

    return run(source, compiled, userConfig);
  });
});
