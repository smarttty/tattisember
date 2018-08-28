import Ember from 'ember';
export default Ember.Route.extend({
  model(){
    this.store.push({
      data:[
        {
          id:1,
          type:'education-programm',
          attributes:{
            name: 'physics',
            description: 'very difficult',
          }

        },
        {
          id:2,
          type:'education-programm',
          attributes:{
            name: 'maths',
            description: 'not very difficult',
          }

        },
        {
          id:3,
          type:'education-programm',
          attributes:{
            name: 'russian',
            description: 'very difficult',
          }

        },
        {
          id:4,
          type:'education-programm',
          attributes:{
            name: 'english',
            description: 'not very difficult',
          }

        },
        {
          id:5,
          type:'education-programm',
          attributes:{
            name: 'chemistry',
            description: 'very difficult',
          }

        },

      ]
    });
    var ep1 = this.store.peekRecord('education-programm', 1);
    var ep2 = this.store.peekRecord('education-programm', 2);
    var ep3 = this.store.peekRecord('education-programm', 3);
    var ep4 = this.store.peekRecord('education-programm', 4);
    var ep5 = this.store.peekRecord('education-programm', 5);


    console.log(ep1);
    this.store.push({
      data:[
        {
          id:1,
          type:'semestr',
          attributes:{
            name: 'first',
            description: 'not very difficult semestr',
            eps:[ep2,ep4]
          }
        },
        {
          id:2,
          type:'semestr',
          attributes:{
            name: 'second',
            description: 'very difficult semestr',
            eps:[ep1,ep3,ep5]
          }
        }
      ]
    });


    return this.store.findAll('semestr');


  }
});
