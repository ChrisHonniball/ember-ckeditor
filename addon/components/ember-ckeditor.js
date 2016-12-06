/* globals CKEDITOR */
import Ember from 'ember';
import layout from '../templates/components/ember-ckeditor';

export default Ember.Component.extend({
  layout: layout,

  /**
   * Shows additional logging for debug
   * @type {Boolean}
   */
  debug: false,

  /**
   * Makes an inline CKEditor
   * @type {Boolean}
   */
  inline: false,

  /**
   * Holder for the CKEditor instance
   * @type {CKEDITOR Instance}
   */
  _editor: null,

  /**
   * Adds plugins for each component in the DOM.
   * @type {String}
   */
  extraPlugins: '',

  /**
   * Determines if this editor should receive focus on render.
   * @type {Boolean}
   */
  startupFocus: false,

  /**
   * Computed property value to prevent a "Backtracking re-render" error in Glimmer 2
   */
  cke_value: Ember.computed({
    get() {
      return this.get('value');
    }
  }),

  /**
   * Settings for CKEditor
   */
  _settings: Ember.computed(
    'extraPlugins',
    'startupFocus',
  {
    get(){
      let that = this,
        settings = that.getProperties([
          'extraPlugins',
          'startupFocus'
        ]);

      return settings;
    }
  }),

  /**
   * Initializes the component once it's inserted into the DOM.
   * Binds all events to the CKEditor instance
   */
  didInsertElement() {
    this._super(...arguments);
    let initFn = this.get('inline') ? 'inline' : 'replace',
      editor = this._editor = CKEDITOR[initFn](this.get('elementId') + '-editor', this.get('_settings'));

    if(this.get('debug')) {
      Ember.Logger.log(
        "%c%s#didInsertElement initializing CKEditor on `#%s`",
        "color: purple", // http://www.w3schools.com/html/html_colornames.asp
        this.toString(),
        this.get('elementId') + '-editor'
      );
    }

    this._editor.component = this;

    editor.on('instanceReady', (e) => {
      if(!e.editor.getData()) {
        e.editor.element.addClass('cke_empty');
      } else {
        e.editor.element.removeClass('cke_empty');
      }

      if(e.editor.component.get('debug')) {
        Ember.Logger.log(
          "%c%s#instanceReady...",
          "color: purple", // http://www.w3schools.com/html/html_colornames.asp
          e.editor.component.toString()
        );
      }
    });

    editor.on('blur', (e) => {
      if(!e.editor.getData()) {
        e.editor.element.addClass('cke_empty');
      } else {
        e.editor.element.removeClass('cke_empty');
      }

      if(e.editor.component.get('debug')) {
        Ember.Logger.log(
          "%c%s#blur setting value...",
          "color: purple", // http://www.w3schools.com/html/html_colornames.asp
          e.editor.component.toString()
        );
      }


      if(this.attrs.blur) {
        if(e.editor.component.get('debug')) {
          Ember.Logger.log(
            "%c%s#blur sending blur action...",
            "color: purple", // http://www.w3schools.com/html/html_colornames.asp
            e.editor.component.toString()
          );
        }
        this.attrs.blur();
      }
    });

    editor.on('change', (e) => {
      if(e.editor.component.get('debug')) {
        Ember.Logger.log(
          "%c%s#instanceReady...",
          "color: purple", // http://www.w3schools.com/html/html_colornames.asp
          e.editor.component.toString()
        );
      }

      e.editor.component.set('value', e.editor.getData());
    });
  },

  /**
   * Teardown
   */
  willDestroyElement() {
    this._super(...arguments);

    if(this.get('debug')) {
      Ember.Logger.log(
        "%c%s#willDestroyElement...",
        "color: purple", // http://www.w3schools.com/html/html_colornames.asp
        this.toString()
      );
    }

    this._editor.destroy();
    this._editor = null;
  }
});
