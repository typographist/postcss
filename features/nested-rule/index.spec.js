const run = require('../../run');
const { userConfig } = require('../../mocks/user-config');

describe('nested rules', () => {
  it('should transform nested rule', () => {
    const source = `
      .test,
      .some-test {
        font-size: 1rem;

        &__wrap,
        &__inner {
          font-size: 2rem;

          &:hover {
            background-color: pink;
          }
        }
      }`;

    const compiled = `
      .test,
      .some-test {
        font-size: 1rem
      }
.test__wrap,
.test__inner,
.some-test__wrap,
.some-test__inner {
        font-size: 2rem;
}
.test__wrap:hover,
.test__inner:hover,
.some-test__wrap:hover,
.some-test__inner:hover {
        background-color: pink;
}`;

    return run(source, compiled, userConfig);
  });
});
