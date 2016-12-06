# Ember-ckeditor

This README outlines the details of collaborating on this Ember addon.

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

## CKEditor Plugins creating long build times

In order to be able to use fingerprinting on your project you will need to add the following options to your `ember-cli-build.js` to prevent Ember CLI from fingerprinting all of the CKEditor plugin files.

```javascript
  var app = new EmberApp(defaults, {
    // Add options here
    fingerprint: {
      exclude: ['ckeditor'],
      ignore: ['ckeditor']
    }
  });
```
