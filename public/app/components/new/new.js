angular.module('App')
.component('newComp', {
  templateUrl: 'app/components/new/new.html',
  controller: NewCompCtrl,
  controllerAs: 'newComp'
});

function NewCompCtrl(){
  var newComp = this;

  // TODO: THIS NEEDS TO BE LINKED WITHIN THE HTML TO AN INPUT BY {{NEWCOMP.QUERY}}
  newComp.query = "";

  // TODO: A SERVICE NEEDS TO BE CREATED IN THE DATASERVICES SERVICE WHICH RETURNS
  // OUR JSON FILE BASED ON THE INPUT QUERY
  var data = DataServices.getStock(newComp.query)
}

NewCompCtrl.$inject = [];
