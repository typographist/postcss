const run = require('../../run');
const { userConfig } = require('../../mocks/user-config');

describe('@only', () => {
  it('should replace @only(desktop) with @media (min-width: 48em) and (max-width: 61.99875em)', () => {
    const source = `
        .test {
          @only (desktop) {
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

describe('@only atrule with orientation', () => {
  it('should replace @only(desktop):landscape with @media (min-width: 48em) and (max-width: 61.99875em) and (orientation: landscape)', () => {
    const source = `
        .test {
          @only (desktop):landscape {
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

  it('should replace @only(desktop):portrait with @media (min-width: 48em) and (max-width: 61.99875em) and (orientation: portrait)', () => {
    const source = `
        .test {
          @only (desktop):portrait {
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
