import Ember from 'ember';
import RSVP from 'rsvp';
export default Ember.Route.extend({
  model() {

    this.store.push({
      data: [
        {
          id: 1,
          type: 'education-programm',
          attributes: {
            name: 'physics',
            description: 'very difficult',
          }

        },
        {
          id: 2,
          type: 'education-programm',
          attributes: {
            name: 'maths',
            description: 'not very difficult',
          }

        },
        {
          id: 3,
          type: 'education-programm',
          attributes: {
            name: 'russian',
            description: 'very difficult',
          }

        },
        {
          id: 4,
          type: 'education-programm',
          attributes: {
            name: 'english',
            description: 'not very difficult',
          }

        },
        {
          id: 5,
          type: 'education-programm',
          attributes: {
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
      data: [
        {
          id: 1,
          type: 'semestr',
          attributes: {
            name: 'First',
            description: 'Not very difficult semestr',
            dateBegin: '01.09.2018',
            dateEnd: '30.12.2018',
          }
        },
        {
          id: 2,
          type: 'semestr',
          attributes: {
            name: 'Second',
            description: 'Very difficult semestr',
            dateBegin: '01.01.2019',
            dateEnd: '30.05.2019',
          }
        }
      ]
    });
    var sem1 = this.store.peekRecord('semestr', 1);
    sem1.set('eps', [ep2, ep4]);

    var sem2 = this.store.peekRecord('semestr', 2);
    sem2.set('eps', [ep1, ep3, ep5]);

    var self=this;
    return this.store.findAll('semestr').then(function (data) {
        var semestrList = data;
        console.log(semestrList);
        var defProrityArray = [];
        semestrList.forEach(function (sem) {
          var semPriorityArray = [];
          sem.get('eps').forEach(function (ep) {
            semPriorityArray.push(ep.get('num'));
          });
          defProrityArray.push(semPriorityArray);
        });
        console.log(defProrityArray);

        self.store.push({
          data: [
            {
              id: '12KTA34',
              type: 'contract',
              attributes: {
                description: 'Kochneva Tatiana Andreevna contract',
                priorities: defProrityArray,
              }
            },
            {
              id: '12KLA34',
              type: 'contract',
              attributes: {
                description: 'Kleiman Lev Alexandrovich contract',
                priorities: defProrityArray,
              }
            },
            {
              id: '12SAE34',
              type: 'contract',
              attributes: {
                description: 'Shmakova Anna Evgenievna contract',
                priorities: defProrityArray,
              }
            },

          ]

        });
        return self.store.findAll('contract').then(function(data){
          return RSVP.hash({
            contracts: data,
            semestrList: semestrList,
          });
        });


      });




  }
});
