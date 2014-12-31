'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var path = require('path');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var browserify = require('browserify');
var cssPreprocessor = require('gulp-<% if (less) { %>less<% } else { %>sass<% } %>');

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

gulp.task('css', function () {
  gulp.src('./src/<% if (less) { %>less<% } else { %>scss<% } %>/main.<% if (less) { %>less<% } else { %>scss<% } %>')
    .pipe(sourcemaps.init())
    .pipe(cssPreprocessor())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist/css'));
});
