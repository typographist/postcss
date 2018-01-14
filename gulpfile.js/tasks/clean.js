const gulp = require('gulp');
const del = require('del');
const paths = require('../paths.config');

const IS_DEVELOPMENT =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

gulp.task('clean', () => {
  if (IS_DEVELOPMENT) return del(paths.src.mainCss);
  return del(paths.root.dist);
});
