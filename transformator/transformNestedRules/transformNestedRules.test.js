const run = require('../../helpersForTests/run');
const { userConfig } = require('../../helpersForTests/mocks');

describe('transformator', () => {
  describe('nested rules', () => {
    it('should transform nested rule', () => {
      const source = `
      .test {
        font-size: 1rem;

        &__inner,
        &__overlay {
          font-size: 2rem;
        }
      }`;

      const compiled = `
      .test {
        font-size: 1rem
      }
.test__inner,
        .test__overlay {
        font-size: 2rem;
}`;

      return run(source, compiled, userConfig);
    });
  });
});
