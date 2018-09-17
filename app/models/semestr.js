import DS from 'ember-data';
import date from 'ember-data/transforms/date';

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  dateBegin: DS.attr('date'),
  dateEnd: DS.attr('date'),
  eps:DS.hasMany('education-programm')
});
