angular.module('App')
.service('DataServices', DataServices);

function DataServices(){

  this.test = function(){
    console.log("hello world");
  }

}
