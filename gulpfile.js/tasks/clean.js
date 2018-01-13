const gulp = require('gulp');
const del = require('del');
const paths = require('../paths.config');

gulp.task('clean', () => del([paths.dist.AllCss, paths.dist.AllJs]));
