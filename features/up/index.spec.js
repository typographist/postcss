const run = require('../../run');
const { userConfig } = require('../../mocks/user-config');

describe('@up atrule', () => {
  it('should replace @up(desktop) with valid media query', () => {
    const source = `
        .test {
          @up(desktop) {
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

  it('should replace @up(1000px) with valid media query', () => {
    const source = `
        .test {
          @up(1000px) {
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

  it('should replace @up(40em) with valid media query', () => {
    const source = `
        .test {
          @up(40em) {
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

describe('@up atrule with orientation', () => {
  it('should replace @up(40em):landscape with valid media query', () => {
    const source = `
      .test {
        @up(40em):landscape {
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

  it('should replace @up(40em):portrait with valid media query', () => {
    const source = `
      .test {
        @up(40em):portrait {
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
