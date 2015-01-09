'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var react = require('gulp-react');
var cache = require('gulp-cached');

var jsFiles = [
  'src/**/*.js'
];

gulp.task('jshint', function () {
  return gulp.src(jsFiles)
  .pipe(cache('jshint'))
  .pipe(react())
  .on('error', function (err) {
    console.log('JSX error in ', err.fileName);
    console.log(err.message);
    this.end();
  })
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'))
  .pipe(jshint.reporter('fail'));
});

gulp.task('jshint-watch', ['jshint'], function (callback) {
  gulp.watch(jsFiles, ['jshint']);
});
