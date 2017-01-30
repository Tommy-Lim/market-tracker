angular.module('App')
.service('DataServices', DataServices);

function DataServices(){

  this.test = function(){
    console.log("Data Services hit");
  }

}
