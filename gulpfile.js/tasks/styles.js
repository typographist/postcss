const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const combine = require('stream-combiner2').obj;
const paths = require('../paths.config');

const IS_DEVELOPMENT =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

gulp.task('styles', () =>
  combine(
    gulp.src(paths.src.styles.entry),
    $.if(IS_DEVELOPMENT, $.sourcemaps.init()),
    $.sass(),
    $.if(IS_DEVELOPMENT, $.sourcemaps.write()),
    $.if(IS_DEVELOPMENT, gulp.dest(paths.root.dist)),
    $.if(!IS_DEVELOPMENT, gulp.dest(paths.root.src)),
  ).on('error', $.notify.onError()),
);
