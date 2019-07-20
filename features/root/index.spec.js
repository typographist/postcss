const run = require('../../run');
const { userConfig } = require('../../mocks/user-config');

describe('@root atrule', () => {
  it('should relpace "@root;" with native css', () => {
    const source = `
        :root {
          @root;
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
                    font-size: 65.625%;
          }
}
@media  (min-width: 48em) {
          :root {
                    font-size: 71.875%;
          }
}
@media  (min-width: 62em) {
          :root {
                    font-size: 78.125%;
          }
}
@media  (min-width: 75em) {
          :root {
                    font-size: 81.25%;
          }
}`;

    return run(source, compiled, userConfig);
  });
});

it('should replace "@root(fluid)" with native css', () => {
  const source = `
        :root {
          @root(fluid);
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
                    font-size: calc(62.5% + 0.5 * ((100vw - 36em) / 192));
          }
}
@media  (min-width: 48em) {
          :root {
                    font-size: calc(65.625% + 1 * ((100vw - 48em) / 224));
          }
}
@media  (min-width: 62em) {
          :root {
                    font-size: calc(71.875% + 1 * ((100vw - 62em) / 208));
          }
}
@media  (min-width: 75em) {
          :root {
                    font-size: 81.25%;
          }
}`;

  return run(source, compiled, userConfig);
});
