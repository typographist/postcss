# Typographist <img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS Logo" width="90" height="90" align="right">
Be free, create!

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
  - [root font-size](#root-font-size)


## Introduction

### What is a Typographist?

The Typographist is a mobile first progressive toolkit for web designers and developers that allows you to build interfaces with responsive graphics. Having absorbed the best qualities of <a href="https://github.com/jakegiltsoff/sassline" target="_blank" title="Sassline">Sassline</a> and <a href="https://github.com/matejlatin/Gutenberg" target="_blank" title="Gutenberg">Gutenberg</a>, it significantly simplifies the process of improving typography on the web.
His idea is to give the developer the most simple, powerful and flexible tool that will take over all the routine work in the form of complex calculations. The Typographist builds a basic grid to establish the correct vertical rhythm on the basis of rem, and also establishes macro-tipography, which allows paying special attention to micro-tipographic details. Also the toolkit is perfectly combined with css grid layout.

### Base type & line-height

The correct vertical rhythm leads to a constant distance between the elements, which helps to clarify the structure and order of the contents and to associate it with other elements. The ultimate goal of the program is to draw the reader's attention to the text and improve the readability in general.

### Root font-size = ½ line-height

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
  
  If you carefully monitor everything, you probably noticed that I did not set a ratio for a breakpoint named lgDesktop. All right. As mentioned earlier, this value will be inherited from the previous breakpoint.

  I hope it was not difficult for you. The idea of such a simple configuration I borrowed from <a href="https://github.com/scottkellum" target="_blank" title="Skott Kellum">Skott Kellum</a> and his remarkable project <a href="https://github.com/modularscale/modularscale-sass" target="_blank" title="modularscale-sass">modularscale-sass</a>. Well? Fasten your seat belts. Now the fun begins.)
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

  ### Root font-size
  Set the root font-size.
  ```
    :root {
      @t-root;
    }
  ```