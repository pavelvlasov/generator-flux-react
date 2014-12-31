'use strict';

var yeoman = require('yeoman-generator');
var util = require('util');
var path = require('path');
var yosay = require('yosay');
var chalk = require('chalk');
var slug = require('slug');

module.exports = yeoman.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },
  askFor: function () {
    var done = this.async();

    this.log(yosay('Welcome to the Flux/React generator!'));

    var prompts = [{
      type: 'string',
      name: 'appName',
      message: 'Enter name of your app',
      default: 'My Flux App'
    }, {
      type: 'string',
      name: 'appSlug',
      message: 'Enter machine readable name for you app',
      default: function (answers) {
        return slug(answers.appName).toLowerCase();
      }
    }, {
      type: 'string',
      name: 'appDesc',
      message: 'Enter your app description',
      default: ''
    }, {
      type: 'list',
      name: 'cssPreprocessor',
      message: 'Which css preprocessor to use?',
      default: 'less',
      choices: ['less', 'sass']
    }];

    this.prompt(prompts, (function (answers) {
      this.appName = answers.appName;
      this.appSlug = answers.appSlug;
      this.appDesc = answers.appDesc;
      this.less = false;
      this[answers.cssPreprocessor] = true;
      done();
    }).bind(this));
  },
  app: function () {
    var preprocessor = this.less ? 'less' : 'scss';
    this.directory('./bundle', './');
    this.template('main.css', 'src/' + preprocessor + '/main.' + preprocessor);
  }
});
