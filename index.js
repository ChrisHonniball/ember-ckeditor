/* jshint node: true */
'use strict';
var Funnel = require('broccoli-funnel'),
  path = require('path');

module.exports = {
  name: 'ember-ckeditor',

  included: function(app) {
    this._super.included(app);

    app.import(app.bowerDirectory + '/ckeditor/ckeditor.js');
    app.import(path.join('vendor', 'ember-ckeditor.js'), { type: 'vendor', prepend: true });
  },

  treeForPublic: function(tree) {
    return new Funnel(this.project.bowerDirectory + '/ckeditor', {
      srcDir: '/',
      destDir: '/assets/ckeditor'
    });
  },

  isDevelopingAddon: function() {
    return true;
  }
};
