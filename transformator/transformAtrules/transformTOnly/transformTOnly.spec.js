const run = require('../../../helpersForTests/run');
const { userConfig } = require('../../../helpersForTests/mocks');

describe('transformator', () => {
  describe('@t-only', () => {
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
});
