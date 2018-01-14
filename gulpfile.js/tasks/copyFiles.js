const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const paths = require('../paths.config');

gulp.task('copyFiles', () =>
  gulp
    .src([
      './devToolsSrc/**',
      '!./devToolsSrc/styles/**/*',
      '!./devToolsSrc/index.html',
      '!./devToolsSrc/tools.js',
      '!./devToolsSrc/bundle.js',
    ])
    .pipe($.changed(paths.root.dist))
    .pipe(gulp.dest(paths.root.dist)),
);
