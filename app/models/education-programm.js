import DS from 'ember-data';
import Ember from 'ember';
export default DS.Model.extend({
  name: DS.attr('string'),
  num: Ember.computed('semestr.id','id', function() { return `${this.get('semestr.id')}.${this.get('id')}`;}),
  description: DS.attr('string'),
  semestr: DS.belongsTo('semestr')

});
