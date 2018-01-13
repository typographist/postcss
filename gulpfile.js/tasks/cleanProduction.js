const gulp = require('gulp');
const del = require('del');
const paths = require('../paths.config');

gulp.task('cleanProduction', () =>
  del([paths.src.tools, paths.dist.AllJs, paths.dist.AllCss]),
);
