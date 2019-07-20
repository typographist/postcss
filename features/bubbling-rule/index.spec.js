const run = require('../../run');
const { userConfig } = require('../../mocks/user-config');

describe('bubbling rule', () => {
  it('should transform bubbling rule', () => {
    const source = `
      :global {
        .test {
          color: red;
        }

        .some-item {
          font-size: 1rem;
        }
      }

      :local {
        .item {
          width: 200px;
        }
      }`;

    const compiled = `
      :global .test {
          color: red;
}
:global .some-item {
          font-size: 1rem;
}
:local .item {
          width: 200px;
}`;

    return run(source, compiled, userConfig);
  });
});
