import Ember from 'ember';

export default Ember.Controller.extend({
  showSemestrs: false,
  contractNumber: '',
  contractMask: /^[1-9]{2}[a-zA-Z]{3}[1-9]{2}$/,
  inContract: null,
  actions: {
    checkContractNumber() {
      var self = this;
      if (this.contractNumber.match(this.contractMask)) {
        this.model.contracts.forEach(function (ct) {
          if (ct.get('id') === self.contractNumber) {
            Ember.set(self, 'showSemestrs', true);
            Ember.set(self, 'inContract', ct);
          }
        });
        if (!self.showSemestrs) {
          alert('No such number');
        }
      }
      else {
        alert('Uncorrect number');
        Ember.set(this, 'showSemestrs', false);
      }
    },
    savePriority(){

    }
  }
});
