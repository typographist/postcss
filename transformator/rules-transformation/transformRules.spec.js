import { run, userConfig } from '@helpers-for-tests';

describe('transformator', () => {
  describe('transform bubbling rule', () => {
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
});
