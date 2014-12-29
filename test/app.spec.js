'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;

describe('App Generator', function () {
  var app;

  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, '../.tmp'), function (err) {
      if (err) {
        return done(err);
      }

      app = helpers.createGenerator('flux-react:app', ['../app']);
      done();
    });
  });

  it('creates expected files', function (done) {
    var expectedFiles = ['.jshintrc'];

    helpers.mockPrompt(app, {
      appName: 'Test App'
    });

    app.run({}, function () {
      helpers.assertFile(expectedFiles);

      done();
    });
  });
});
