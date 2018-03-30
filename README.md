# Typographist <img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS Logo" width="90" height="90" align="right">
Be free, create!

## Documentation

- [introduction](#introduction)
- [getting Started](#getting-started)
  - [installation](#installation)
  - [configuration](#configuration)
    - [typographist with webpack](#typographist-with-webpack)
    - [typographist with gulp](#typographist-with-gulp)

## Introduction

### What is a Typographist?

The Typographist is a mobile first progressive toolkit for web designers and developers that allows you to build interfaces with responsive graphics. Having absorbed the best qualities of [Sassline](https://github.com/jakegiltsoff/sassline, 'Sassline') and [Gutenberg](https://github.com/matejlatin/Gutenberg, 'Gutenberg'), it significantly simplifies the process of improving typography on the web.
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

  with requireJs
  ```js
  const {typographist, ratios} = require('typographist');
  ```

  with es6 modules
  ```js
  import { typographist, ratios } from 'typographis';
  ```

  2. Set font size for standard paragraph text. For example, I will install 16px, but you can choose one that you like. 
  Feel free to constantly experiment.
  ```js
    typographist({
      base: '16px'
    });

  ```
  3. Set the line-height.
  ```js
    typographist({
      base: '16px',
      lineHeight: 1.4,
    });
  ```
  4. Set the ratio
  ```js
    typographist({
        base: '16px',
        lineHeight: 1.4,
        ratio: ratios.MINOR_SECOND
    });
  ```

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