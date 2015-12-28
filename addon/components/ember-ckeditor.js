/* globals CKEDITOR */
import Ember from 'ember';
import layout from '../templates/components/ember-ckeditor';

export default Ember.Component.extend({
  layout: layout,
  
  inline: false,
  _editor: null,
  
  extraPlugins: '',
  startUpFocus: false,
  
  _settings: Ember.computed(
    'extraPlugins',
    'startUpFocus'
  {
    get(){
      let that = this,
        settings = that.getProperties([
          'extraPlugins',
          'startUpFocus'
        ]);
      
      return settings;
    }
  }),

  didInsertElement() {
    let initFn = this.get('inline') ? 'inline' : 'replace',
      editor = this._editor = CKEDITOR[initFn](this.get('elementId') + '-editor', this.get('_settings'));
    
    this._editor.targetObject = this;
    
    editor.on('change', (e) => {
      this.set('value', e.editor.getData());
    });
    
    editor.on('blur', (e) => {
      if(!e.editor.getData()) {
        e.editor.element.addClass('cke_empty');
      } else {
        e.editor.element.removeClass('cke_empty');
      }
      
      if(this.attrs.blur) {
        this.attrs.blur();
      }
    });
    
    editor.on('instanceReady', (e) => {
      if(!e.editor.getData()) {
        e.editor.element.addClass('cke_empty');
      } else {
        e.editor.element.removeClass('cke_empty');
      }
    });
  },

  willDestroyElement() {
    this._editor.destroy();
    this._editor = null;
  }
});
