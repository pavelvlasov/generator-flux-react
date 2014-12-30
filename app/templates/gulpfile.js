'use strict';

var gulp = require('gulp');
var requireDirectory = require('require-directory');

requireDirectory(module, './gulp');

gulp.task('build', ['js']);
