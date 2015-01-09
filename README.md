generator-flux-react
====================

A yeoman generator for apps, based on Flux/React architecture

# generator-flux

> [Flux](http://facebook.github.io/flux/)/[React](http://facebook.github.io/react/) application generator


## Getting Started

### What is Flux?

It's an "Application Architecture for Building User Interfaces", built by the team at Facebook. It's a set of patterns building larger applications on top of the incredible [React](http://facebook.github.io/react/) component library.

![http://facebook.github.io/flux/docs/overview.html#content](http://facebook.github.io/react/img/blog/flux-diagram.png)

### Prerequisites

```bash
$ npm install -g yo
```

### Installing the generator

To install generator-flux-react from npm, run:

```bash
$ npm install -g generator-flux-react
```

Finally, initiate the generator:

```bash
$ yo flux-react
```


### Configuration Options

During install-time, you will be prompted to enter some information to help create the project structure and `package.json` file:

* __Application name__ (_string_): A human-readable name for your project, i.e. "My Flux Application"
* __Machine-readable name__ (_string_): This will be used in `package.json` as your project identifier, and is generated automatically from the _Application Name_ if you choose the default.
* __Application Description__ (_string_): Describe your application in one sentence, to be used in `package.json` and the generated `README.md`
* __css preprocessor__: Choose between `less` and `sass` css preprocessors


### TODO
* generators for stores and actions
* file server gulp task
* jshint task
* e2e testing with `protractor`
