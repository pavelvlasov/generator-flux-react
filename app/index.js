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
    }];

    this.prompt(prompts, (function (props) {
      this.appName = props.appName;
      this.appSlug = props.appSlug;
      this.appDesc = props.appDesc;
      done();
    }).bind(this));
  },
  app: function () {
    this.directory('./', './');
  }
});
