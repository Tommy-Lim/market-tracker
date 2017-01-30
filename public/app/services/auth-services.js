angular.module('App')
.service('AuthServices', AuthServices);

function AuthServices($window){

  this.test = function(){
    console.log("Auth Services hit");
  }

  this.saveToken =  function(token) {
    $window.localStorage['secretrecipes-token'] = token;
  }

  this.getToken =  function() {
    return $window.localStorage['secretrecipes-token'];
  }

  this.removeToken =  function() {
    $window.localStorage.removeItem('secretrecipes-token');
  }

  this.isLoggedIn =  function() {
    var token = this.getToken();
    return token ? true : false;
  }

  this.currentUser =  function() {
    if (this.isLoggedIn()) {
      var token = this.getToken();
      try {
        var payload = JSON.parse($window.atob(token.split('.')[1]));
        return payload;
      } catch(err) {
        return false;
      }
    }
  }

}

AuthServices.$inject = ['$window'];
