angular.module('App')
.service('AuthServices', AuthServices);

function AuthServices(){

  this.test = function(){
    console.log("Auth Services hit");
  }
}
