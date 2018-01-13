const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const paths = require('../paths.config');

gulp.task('serve', () => {
  browserSync.init({
    open: false,
    notify: false,
    server: paths.root.dist,
  });

  browserSync.watch([paths.root.serve]).on('change', browserSync.reload);
});
