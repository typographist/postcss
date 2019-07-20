const run = require('../../run');
const { userConfig } = require('../../mocks/user-config');

describe('transform step unit function', () => {
  it('should transform from step to rem if @up atrule is set.', () => {
    const source = `
            .test {
              @up(desktop) {
                font-size: 2step;
              }
            }`;
    const compiled = `
            @media (min-width: 48em) {
    .test {
        font-size: 2rem;
    }
}`;

    return run(source, compiled, userConfig);
  });
  it('should transform step to rem if @down is set.', () => {
    const source = `
                .test {
                  @down(desktop) {
                    font-size: 2step;
                  }
                }`;
    const compiled = `
                @media (max-width: 61.99875em) {
    .test {
        font-size: 2rem;
    }
}`;

    return run(source, compiled, userConfig);
  });
  it('should transform step to rem if @only is set.', () => {
    const source = `
                .test {
                  @only(desktop) {
                    font-size: 2step;
                  }
                }`;
    const compiled = `
                @media (min-width: 48em) and (max-width: 61.99875em) {
    .test {
        font-size: 2rem;
    }
}`;

    return run(source, compiled, userConfig);
  });
});
