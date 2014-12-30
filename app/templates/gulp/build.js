'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var browserify = require('browserify');

var builder = browserify('./src/js/app.js', {
  transform: 'reactify'
});

gulp.task('watchJs', function () {
  var bundler = watchify(builder, watchify.args);
  bundler.on('update', function () {
    bundle(bundler);
  });
  return bundle(bundler);
});
gulp.task('js', function () {
  bundle(builder);
});

function bundle(bundler) {
  return bundler.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/js/'));
}
