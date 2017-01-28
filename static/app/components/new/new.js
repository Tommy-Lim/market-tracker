angular.module('App')
.component('newComp', {
  templateUrl: 'app/containers/new/new.html',
  controller: NewCompCtrl,
  controllerAs: 'newComp'
});

function NewCompCtrl(){
  var newComp = this;

}

NewCompCtrl.$inject = [];
