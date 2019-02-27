import { run, userConfig } from '@helpers-for-tests';

describe('transformator', () => {
  describe('@t-base atrule', () => {
    it('should remove outside body', () => {
      const config = { base: ['16px', '33px'], lineHeight: 1.5, ratio: 1.333 };
      const source = `
        div {
          @t-base;
        }`;
      const compiled = '';
      return run(source, compiled, config);
    });

    it(
      'should replace t-base with css variables with breakpoint values, ' +
        'the font size specified in percent, specify the font size for each breakpoint',
      () => {
        const source = `
          body {
            @t-base;
          }`;

        const compiled = `
          body {
            font-size: 1.6rem;
            line-height: 2rem;
          }
@media  (min-width: 36em) {
            body {
                        font-size: 1.5454545454545454rem;
            }
}
@media  (min-width: 48em) {
            body {
                        font-size: 1.5rem;
            }
}
@media  (min-width: 62em) {
            body {
                        font-size: 1.5384615384615385rem;
            }
}
@media  (min-width: 75em) {
            body {
                        font-size: 1.6153846153846154rem;
            }
}`;
        return run(source, compiled, userConfig);
      },
    );
  });
});
