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

  before(function (done) {
    helpers.testDirectory(testDirectory, function (err) {
      if (err) {
        return done(err);
      }

      app = helpers.createGenerator('flux-react:app', ['../app']);
      done();
    });
  });

  it('creates expected files', function (done) {
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

    helpers.mockPrompt(app, {
      appName: 'Test App'
    });

    app.run({}, function () {
      helpers.assertFile(expectedFiles);

      done();
    });
  });

  it('install dependencies', function (done) {
    // set larger timeout to instal deps
    this.timeout(60000);
    shell.cd(testDirectory);
    exec('npm install');

    done();
  });

  it('builds js', function (done) {
    exec('gulp js');

    helpers.assertFile([
      'dist/js/app.js'
    ]);

    done();
  });
});
