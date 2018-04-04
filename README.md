# Typographist <img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS Logo" width="90" height="90" align="right">

<h2><a href="https://maxinakenty.github.io/" target="_blank" title="Demo">Demo</a></h2>

## Documentation

- [introduction](#introduction)
- [getting Started](#getting-started)
  - [installation](#installation)
  - [configuration](#configuration)
    - [base](#base)
    - [line-height](#line-height)
    - [ratio](#ratio)
    - [breakpoint](#breakpoint)
    - [typographist with webpack](#typographist-with-webpack)
    - [typographist with gulp](#typographist-with-gulp)
  
  CSS
  - [postcss syntax hightlight](#postcss-syntax-hightlight)
  - [syntax peculiarity](#syntax-peculiarity)
  - [root font size](#root-font-size)
  - [base font size](#base-font-size)
  - [breakpoints](#breakpoints)
  - [step unit](#step-unit)
  - [t-step function](#t-step-function)
  - [nesting](#nesting)



## Introduction

### What is a Typographist?

The Typographist is a mobile first progressive toolkit for web designers and developers that allows you to build interfaces with responsive graphics. Having absorbed the best qualities of <a href="https://github.com/jakegiltsoff/sassline" target="_blank" title="Sassline">Sassline</a> and <a href="https://github.com/matejlatin/Gutenberg" target="_blank" title="Gutenberg">Gutenberg</a>, it significantly simplifies the process of improving typography on the web.
His idea is to give the developer the most simple, powerful and flexible tool that will take over all the routine work in the form of complex calculations. The Typographist builds a basic grid to establish the correct vertical rhythm on the basis of rem, and also establishes macro-tipography, which allows paying special attention to micro-tipographic details. Also the toolkit is perfectly combined with css grid layout.

### Base type * line-height = leading

The correct vertical rhythm leads to a constant distance between the elements, which helps to clarify the structure and order of the contents and to associate it with other elements. The ultimate goal of the program is to draw the reader's attention to the text and improve the readability in general.

### Root font-size = ½ leading

Typographist works by setting the root font-size as half the line-height of the standard paragraph text. The height of the baseline grid is then effectively set at 2, with increments at each 1rem. This makes it a pleasant and easy tool for creating harmony of content in your layout and typography. This is based off a technique for setting text in print documents.

## Getting Started
### Installation

To install the stable version:

Use yarn or npm
```
yarn add typographist
```
```
npm i typographist
```

### Configuration
  1. Connect Typographist

  requireJs
  ```js
  const { typographist, ratios } = require('typographist');
  ```

  es6 modules
  ```js
  import { typographist, ratios } from 'typographist';
  ```
  #### Base
  2. Set font size for standard paragraph text. For example, I set 16px, but you can choose one that you like. Feel free to constantly experiment.
    Base is set for each breakpoint.
  ```js
  typographist({
    base: '16px'
  });
  ```

  #### Line-height
  3. Set the line-height. For example, I set 1.4. It is not necessary to specify at each breakpoint. Each next breakpoint inherits the value of line-height from the previous breakpoint.
  ```js
  typographist({
    base: '16px',
    lineHeight: 1.4,
  });
  ```

  #### Ratio
  4. Set the ratio. To do this, we use Tim Brown's <a href="http://www.modularscale.com/" target="_blank" title="Modular Scale">Modular Scale</a>. For example, I set a ratio equal to the minor second (~1.067) <a href="http://www.modularscale.com/?16&px&1.067" target="_blank" title="Let's see what happened">Let's see what happened</a>. It is not necessary to specify at each breakpoint. Each next breakpoint inherits the value of line-height from the previous breakpoint.
  ```js
  typographist({
      base: '16px',
      lineHeight: 1.4,
      ratio: ratios.MINOR_SECOND
  });
  ```
  ##### Ratios
  
  | function         | ratio   | decimal value |
  |------------------|:-------:|:-------------:|
  | AUGMENTED_FOURTH |  1:√2   |    1.41421    |
  | DOUBLE_OCTAVE    |  1:4    |       4       |
  | GOLDEN_SECTION   | 1:1.618 |   1.618034    |
  | MAJOR_ELEVENTH   |  3:8    |  2.666666667  | 
  | MAJOR_SECOND     |  8:9    |     1.125     |
  | MAJOR_SEVENTH    |  8:15   |     1.875     |
  | MAJOR_SIXTH      |   3:5   |  1.666666667  |
  | MAJOR_TENTH      |   2:5   |      2.5      |
  | MAJOR_THIRD      |   4:5   |     1.25      |
  | MAJOR_TWELFTH    |   1:3   |       3       |
  | MINOR_SECOND     |  15:16  |  1.066666667  |
  | MINOR_SEVENTH    |   9:16  |  1.777777778  |
  | MINOR_THIRD      |   5:6   |      1.2      |
  | OCTAVE           |   1:2   |       2       |
  | PERFECT_FIFTH    |   2:3   |      1.5      |
  | PERFECT_FOURTH   |   3:4   |  1.333333333  |
  | PHI              | 1:1.618 |    1.618034   |

  #### Breakpoint
  5. Set the breakpoint name and breakpoint value.

  ```js
  typographist({
      base: '16px',
      lineHeight: 1.4,
      ratio: ratios.MINOR_SECOND,
      tablet: {
        breakpoint: '768px',
      }
  });
  ```
 You are not at all limited in choosing a breakpoint name, and you can specify just how many breakpoints you need. If you are used to naming breakpoints as in bootstrap. Nothing prevents you from using the usual names.


  ```js
  typographist({
      base: '16px',
      lineHeight: 1.4,
      ratio: ratios.MINOR_SECOND,
      sm: {
        // your code
      },
      md: {
        // your code
      },
      lg: {
        // your code
      },
      xl: {
        // you code
      }
  });
  ```


  6. Let's set base, line-height, and ratio for each breakpoint. For the tablet, I set the ratio to a <a href="http://www.modularscale.com/?17&px&1.125" target="_blank" title="major second">major second</a> = 1.125. For the desktop it will be equal to the <a href="http://www.modularscale.com/?18&px&1.2" target="_blank" title="minor third">minor third</a> = 1.2.

  ```js
  typographist({
    base: '16px',
    lineHeight: 1.4,
    ratio: ratios.MINOR_SECOND,
    tablet: {
      breakpoint: '768px',
      base: '17px',
      ratio: ratios.MAJOR_SECOND,
    },
    desktop: {
      breakpoint: '992px',
      base: '18px',
      ratio: ratios.MINOR_THIRD,
    },
    lgDesktop: {
      breakpoint: '1200px',
      base: '20px',
    },
  }),
  ```
  
  If you carefully monitored everything, you probably noticed that I did not set a ratio for a breakpoint named lgDesktop. All right. As mentioned earlier, this value will be inherited from the previous breakpoint.

  I hope it was not difficult for you. The idea of such a simple configuration I borrowed from <a href="https://github.com/scottkellum" target="_blank" title="Skott Kellum">Skott Kellum</a> and his remarkable project <a href="https://github.com/modularscale/modularscale-sass" target="_blank" title="modularscale-sass">modularscale-sass</a>. Well? Fasten your seat belts. This is where the fun begins.)


  #### Typographist with Webpack
  You need to create a postcss.config.js
  ```js
  const { typographist, ratios } = require('typographist');

  module.exports = () => ({
    plugins: [
      typographist({
        base: '16px',
        lineHeight: 1.4,
        ratio: ratios.MINOR_SECOND,
        tablet: {
          breakpoint: '768px',
          base: '17px',
          ratio: ratios.MAJOR_SECOND,
        },
        desktop: {
          breakpoint: '992px',
          base: '18px',
          ratio: ratios.MINOR_THIRD,
        },
        lgDesktop: {
          breakpoint: '1200px',
          base: '20px',
        },
      }),
    ],
  });
  ```

  #### Typographist with Gulp
  ```js
  const gulp = require('gulp');
  const gulpIf = require('gulp-if');
  const postcss = require('gulp-postcss');
  const sourcemaps = require('gulp-sourcemaps');
  const rename = require('gulp-rename');
  const cssnano = require('gulp-cssnano');
  const notify = require('gulp-notify');
  const combine = require('stream-combiner2').obj;
  const { typographist, ratios } = require('typographist');

  const processors = [
    typographist({
      base: '16px',
      lineHeight: 1.4,
      ratio: ratios.MINOR_SECOND,
      tablet: {
        breakpoint: '768px',
        base: '17px',
        ratio: ratios.MAJOR_SECOND,
      },
      desktop: {
        breakpoint: '992px',
        base: '18px',
        ratio: ratios.MINOR_THIRD,
      },
      lgDesktop: {
        breakpoint: '1200px',
        base: '20px',
      },
    }),
  ];

  const IS_DEVELOPMENT =
    !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

  gulp.task('styles', () =>
    combine(
      gulp.src('./entryDir/entry.css'),
      gulpIf(IS_DEVELOPMENT, sourcemaps.init()),
      postcss(processors),
      gulpIf(IS_DEVELOPMENT, sourcemaps.write()),
      gulpIf(!IS_DEVELOPMENT, combine(cssnano())),
      rename('main.css'),
      gulp.dest('./outputDir/'),
    ).on('error', notify.onError()),
  );
  ```

  ## CSS
  ### Postcss syntax hightlight
  If you use vscode as the code editor. To avoid conflicts with the linter and to correctly postcss syntax highlighting, install the plugin <a href="https://marketplace.visualstudio.com/items?itemName=ricard.PostCSS#review-details" target="_blank">PostCSS syntax</a>.
  ### Syntax peculiarity
  Syntax peculiarity. All that belongs to the Typographist begins with @t- or t-. Most likely you already thought that without these prefixes it would be more convenient to write the code, but in the future when when there is more code, it will help to avoid confusion. You can always understand what exactly belongs to the typographist.

  ### Root font size
  Input
  Set the root font-size.
  ```css
  :root {
    @t-root;
  }
  ```

  Output
  ```css
  :root {
    --tablet: 768px;
    --desktop: 992px;
    --lg-desktop: 1200px;
    font-size: 68.75%;
  }
  @media  screen and (min-width: 48em) {
    :root {
      font-size: 75%;
    }
  }
  @media  screen and (min-width: 62em) {
    :root {
      font-size: 81.25%;
    }
  }
  @media  screen and (min-width: 75em) {
    :root {
      font-size: 87.5%;
    }
  }
  ```
  Using the @ t-root directive, we calculated the size of the root font for each breakpoint. Also now we have the opportunity to link our css and javascript to native css variables. The value of each breakpoint is converted to em.

  Input
  ```css
  :root {
    @t-root (fluid);
  }
  ```

  Output
  ```css
  :root {
  --tablet: 768px;
  --desktop: 992px;
  --lg-desktop: 1200px;
  font-size: 68.75%;
  }
  @media  screen and (min-width: 48em) {
    :root {
      font-size: calc(68.75% + 2 * ((100vw - 48em) / 224));
    }
  }
  @media  screen and (min-width: 62em) {
    :root {
      font-size: calc(81.25% + 1 * ((100vw - 62em) / 208));
    }
  }
  @media  screen and (min-width: 75em) {
    :root {
      font-size: 87.5%;
    }
  }
  ```
  Now our font and layout have become elastic. It is possible to have precise control over responsive typography. Using calc() and viewport units you can create fluid type that scales perfectly between specific pixel values, within a specific viewport range.
  This was made possible by <a href="https://github.com/MadeByMike" target="_blank" title="Mike Riethmuller">Mike Riethmuller</a>  and his formula.

  ### Base font size
  Input
  ```css
  body {
    @t-base;
  }
  ```

  Output
  ```css
  body {
    font-size: 1.4545454545454546rem;
    line-height: 2rem;
  }
  @media  screen and (min-width: 48em) {
    body {
      font-size: 1.4166666666666667rem;
    }
  }
  @media  screen and (min-width: 62em) {
    body {
      font-size: 1.3846153846153846rem;
    }
  }
  @media  screen and (min-width: 75em) {
    body {
      font-size: 1.4285714285714286rem;
    }
  }
  ```
  The @ t-base directive sets the size of the base font to rem for each breakpoint, and also sets line-height: 2rem.

  ### Breakpoints
  #### @t-above
  @t-above takes as parameters the names of breakpoints, values in pixels or ems.

  Input
  ```css
  .your-class {
    @t-above(desktop) {
      /* your code */
    }
  }
  ```

  Output
  ```css
  @media screen and (min-width: 62em) {
    .your-class {
      /* your code */
    }
  }

  ```
  #### @t-below
  @t-above takes as parameters the names of breakpoints, values in pixels or ems.
    Input
  ```css
  .your-class {
    @t-below(desktop) {
      /* your code */
    }
  }
  ```

  Output
  ```css
  @media screen and (max-width: 74.99875em) {
    .your-class {
      /* your code */ 
    }
  }
  ```
  #### @t-only

  @t-only takes as parameters parameters only the names of breakpoints.

  Input

  ```css
  .your-class {
    @t-only (desktop) {
      /* your code */
  }
  ```

  Output
  ```css
  @media screen and (min-width: 62em) and (max-width: 74.99875em) {
    .test {
      /* your code */
    }
  }
  ```
  #### @t-between
  @t-between takes as parameters the names of breakpoints, values in pixels or ems.

  Input
  
  ```css
  .your-class @t-between(tablet, desktop) {
    /* your code */
  }
  ```

  Output
  ```css
  @media screen and (min-width: 48em) and (max-width: 74.99875em) {
    .your-class {
      /* your code */
    }
  }
  ```

  ### Step unit
  Set the font size from the position in the modular scale. 
  
  <img src="/docs/images/msunit.jpg" alt="position in modular scale">

  To convert step to rem, use directives @t-above, @t-below, or @t-only.

  input
  ```css
  h1 {
    font-size: 6step;

    @-above(tablet) {
      font-size: 6step;
    }

    @t-above(desktop) {
      font-size: 6step;
    }

    @t-above(lg-desktop) {
      font-size: 6step;
    }
  }
  ```
  Output
  ```css
  h1 {
    font-size: 2.1818181818181817rem
  }
  @media screen and (min-width: 48em) {
    h1 {
      font-size: 2.8333333333333335rem;
    }
  }
  @media screen and (min-width: 62em) {
    h1 {
      font-size: 4.153846153846154rem;
    }
  }
  @media screen and (min-width: 75em) {
    h1 {
      font-size: 4.285714285714286rem;
    }
  }
  ```
  Step unit is converted to rem.

  This approach is useful if you want to dramatically increase the font size on any of the breakpoints, but in most cases it is too cumbersome and we force you to duplicate the code every time. For this I have something better for you!

  ### t-step function
  With t-step function we do the same much faster and more gracefully.

  Input
  ```css
  h1 {
    font-size: t-step(6);
  }
  ```

  Output
  ```css
  h1 {
    font-size: 2.1818181818181817rem
  }
  @media screen and (min-width: 48em) {
    h1 {
      font-size: 2.8333333333333335rem;
    }
  }
  @media screen and (min-width: 62em) {
    h1 {
      font-size: 4.153846153846154rem;
    }
  }
  @media screen and (min-width: 75em) {
    h1 {
      font-size: 4.285714285714286rem;
    }
  }
  ```

  ### Nesting
  Inheritance the name of the parent class. Do this as you are used to in sass, less and stylus.

  Input
  ```css
  .your-class {
    border: 1px solid gray;

    &__inner {
      padding: 1rem;
    }

    &__inner_active {
      background-color: rebeccapurple;
    }

    &:hover {
      border: 1px solid black;
    }
  }
  ```

  Output
  ```css
  .your-class {
    border: 1px solid gray
  }
  .your-class__inner {
    padding: 1rem;
  }
  .your-class__inner_active {
    background-color: rebeccapurple;
  }
  .your-class:hover {
    border: 1px solid black;
  }
  ```

  <h2><a href="https://maxinakenty.github.io/" target="_blank" title="Demo">Demo</a></h2>

  ### Result

  typography.css
  ```css
  :root {
    @t-root;
  }

  body {
    @t-base;
  }

  h1 {
    font-size: t-step(6);
  }

  h2 {
    font-size: t-step(5);
  }

  h3 {
    font-size: t-step(4);
  }

  h4 {
    font-size: t-step(3);
  }

  h5 {
    font-size: t-step(2);
  }

  h6 {
    font-size: t-step(1);
  }
  ```

  in your main.css
  ```css
  :root {
    --tablet: 768px;
    --desktop: 992px;
    --lg-desktop: 1200px;
    font-size: 68.75%;
  }

  @media screen and (min-width: 48em) {
    :root {
      font-size: 75%;
    }
  }

  @media screen and (min-width: 62em) {
    :root {
      font-size: 81.25%;
    }
  }

  @media screen and (min-width: 75em) {
    :root {
      font-size: 87.5%;
    }
  }

  body {
    font-size: 1.4545454545454546rem;
    line-height: 2rem;
  }

  @media screen and (min-width: 48em) {
    body {
      font-size: 1.4166666666666667rem;
    }
  }

  @media screen and (min-width: 62em) {
    body {
      font-size: 1.3846153846153846rem;
    }
  }

  @media screen and (min-width: 75em) {
    body {
      font-size: 1.4285714285714286rem;
    }
  }

  h1 {
    font-size: 2.1818181818181817rem;
  }

  @media screen and (min-width: 48em) {
    h1 {
      font-size: 2.8333333333333335rem;
    }
  }

  @media screen and (min-width: 62em) {
    h1 {
      font-size: 4.153846153846154rem;
    }
  }

  @media screen and (min-width: 75em) {
    h1 {
      font-size: 4.285714285714286rem;
    }
  }

  h2 {
    font-size: 2rem;
  }

  @media screen and (min-width: 48em) {
    h2 {
      font-size: 2.5833333333333335rem;
    }
  }

  @media screen and (min-width: 62em) {
    h2 {
      font-size: 3.4615384615384617rem;
    }
  }

  @media screen and (min-width: 75em) {
    h2 {
      font-size: 3.5714285714285716rem;
    }
  }

  h3 {
    font-size: 1.9090909090909092rem;
  }

  @media screen and (min-width: 48em) {
    h3 {
      font-size: 2.25rem;
    }
  }

  @media screen and (min-width: 62em) {
    h3 {
      font-size: 2.8461538461538463rem;
    }
  }

  @media screen and (min-width: 75em) {
    h3 {
      font-size: 2.9285714285714284rem;
    }
  }

  h4 {
    font-size: 1.7272727272727273rem;
  }

  @media screen and (min-width: 48em) {
    h4 {
      font-size: 2rem;
    }
  }

  @media screen and (min-width: 62em) {
    h4 {
      font-size: 2.3846153846153846rem;
    }
  }

  @media screen and (min-width: 75em) {
    h4 {
      font-size: 2.5rem;
    }
  }

  h5 {
    font-size: 1.6363636363636365rem;
  }

  @media screen and (min-width: 48em) {
    h5 {
      font-size: 1.8333333333333333rem;
    }
  }

  @media screen and (min-width: 62em) {
    h5 {
      font-size: 2rem;
    }
  }

  @media screen and (min-width: 75em) {
    h5 {
      font-size: 2.0714285714285716rem;
    }
  }

  h6 {
    font-size: 1.5454545454545454rem;
  }

  @media screen and (min-width: 48em) {
    h6 {
      font-size: 1.5833333333333333rem;
    }
  }

  @media screen and (min-width: 62em) {
    h6 {
      font-size: 1.6923076923076923rem;
    }
  }

  @media screen and (min-width: 75em) {
    h6 {
      font-size: 1.7142857142857142rem;
    }
  }
  ```

MIT License

Copyright (c) 2018 Maxim Alyoshin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


