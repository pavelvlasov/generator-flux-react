'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var shell = require('shelljs');
shell.silent = false;

var testDirectory = path.join(__dirname, '../.tmp');

function exec(command) {
  var res = shell.exec(command);
  if (res.code !== 0) {
    throw new Error('Command `' + command + '` exited with code ' + res.code);
  }
}

describe('App Generator', function () {
  var app;
  var expectedFiles = [
  '.jshintrc',
  'gulpfile.js',
  'package.json',
  'README.md',
  // gulp tasks
  'gulp/build.js',
  // project files
  'src/index.html',
  'src/js/app.js',
  'src/js/actions/Actions.js',
  'src/js/components/Main.react.js',
  'src/js/dispatcher/Dispatcher.js',
  'src/js/stores/.gitkeep'
  ];

  describe('generate app with less compiler', function () {
    before(cleanDirectory);

    it('creates expected files', function (done) {
      helpers.mockPrompt(app, {
        appName: 'Test App',
        cssPreprocessor: 'less'
      });

      app.run({}, function () {
        helpers.assertFile(expectedFiles);
        helpers.assertFile('src/less/main.less');

        done();
      });
    });

    it('install dependencies', function () {
      this.timeout(120000);
      shell.cd(testDirectory);
      exec('npm install');
    });

    it('builds js', function (done) {
      exec('gulp js');

      helpers.assertFile([
      'dist/js/app.js'
      ]);

      done();
    });

    it('build less', function (done) {
      exec('gulp css');

      helpers.assertFile([
      'dist/css/main.css',
      'dist/css/maps/main.css.map'
      ]);

      done();
    });

    it('run tests', function () {
      this.timeout(30000);
      exec('npm test');
    });

    it('run jshint', function () {
      exec('gulp jshint');
    });
  });

  describe('generate app with sass compiler', function () {
    before(cleanDirectory);

    it('creates expected files', function (done) {
      helpers.mockPrompt(app, {
        appName: 'Test App',
        cssPreprocessor: 'sass'
      });

      app.run({}, function () {
        helpers.assertFile(expectedFiles);
        helpers.assertFile('src/scss/main.scss');

        done();
      });
    });

    it('install dependencies', function () {
      this.timeout(120000);
      shell.cd(testDirectory);
      exec('npm install');
    });

    it('build sass', function (done) {
      exec('gulp css');

      helpers.assertFile([
      'dist/css/main.css',
      'dist/css/maps/main.css.map'
      ]);

      done();
    });
  });

  function cleanDirectory(done) {

    helpers.testDirectory(testDirectory, function (err) {
      if (err) {
        return done(err);
      }

      app = helpers.createGenerator('flux-react:app', ['../app']);

      done();
    });
  }
});
