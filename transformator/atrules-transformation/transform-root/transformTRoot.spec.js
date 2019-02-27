import { run, userConfig } from '@helpers-for-tests';

describe('transformator', () => {
  describe('@t-root atrule', () => {
    it('should remove outside :root', () => {
      const config = { base: ['16px', '33px'], lineHeight: 1.5, ratio: 1.333 };

      const source = `
        div { 
          @t-root;
        }`;

      const compiled = '';
      return run(source, compiled, config);
    });
  });

  it(
    'should replace t-root with css variables with breakpoint values, ' +
      'the font size specified in percent, specify the font size for each breakpoint',
    () => {
      const source = `
        :root {
          @t-root;
        }`;

      const compiled = `
        :root {
          --tablet: 576px;
          --desktop: 768px;
          --lg-desktop: 992px;
          --xl-desktop: 1200px;
          font-size: 62.5%;
        }
@media  (min-width: 36em) {
          :root {
                    font-size: 68.75%;
          }
}
@media  (min-width: 48em) {
          :root {
                    font-size: 75%;
          }
}
@media  (min-width: 62em) {
          :root {
                    font-size: 81.25%;
          }
}
@media  (min-width: 75em) {
          :root {
                    font-size: 81.25%;
          }
}`;

      return run(source, compiled, userConfig);
    },
  );

  it(
    'should replace t-root(fluid) with css variables with breakpoint values, ' +
      'the font size specified in percent, specify the font size for each breakpoint',
    () => {
      const source = `
        :root {
          @t-root(fluid);
        }`;

      const compiled = `
        :root {
          --tablet: 576px;
          --desktop: 768px;
          --lg-desktop: 992px;
          --xl-desktop: 1200px;
          font-size: 62.5%;
        }
@media  (min-width: 36em) {
          :root {
                    font-size: calc(62.5% + 2 * ((100vw - 36em) / 192));
          }
}
@media  (min-width: 48em) {
          :root {
                    font-size: calc(75% + 1 * ((100vw - 48em) / 224));
          }
}
@media  (min-width: 62em) {
          :root {
                    font-size: calc(81.25% + 0 * ((100vw - 62em) / 208));
          }
}
@media  (min-width: 75em) {
          :root {
                    font-size: 81.25%;
          }
}`;
      return run(source, compiled, userConfig);
    },
  );
});
