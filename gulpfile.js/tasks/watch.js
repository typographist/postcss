const gulp = require('gulp');
const paths = require('../paths.config');

gulp.task('watch', () => {
  gulp.watch(paths.watch.styles, gulp.series('styles'));
});
