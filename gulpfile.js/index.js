const gulp = require('gulp');
require('require-dir')('./tasks', { recurse: true });

gulp.task('build', gulp.series('clean', 'styles', 'webpack'));
gulp.task('build:production', gulp.series('clean', 'copyFiles'));

gulp.task('default', gulp.series('build', gulp.parallel('serve', 'watch')));
