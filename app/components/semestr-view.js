import Ember from 'ember';

export default Ember.Component.extend({

  actions:{
    saveSem(){
      var newPrArray=[];
      this.semestr.get('eps').forEach(function(ep){
        newPrArray.push(ep.get('num'));
      });
      console.log(this.contract);
      Ember.set(this.contract,'priorities',newPrArray);

      console.log(this.contract.toJSON());
    }
  }
});
