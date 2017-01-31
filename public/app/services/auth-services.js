angular.module('App')
.service('Auth', Auth)
.service('AuthServices', AuthServices);

function Auth($window, $location){
  this.saveToken =  function(token) {
    $window.localStorage['secret-token'] = token;
  }

  this.getToken =  function() {
    return $window.localStorage['secret-token'];
  }

  this.removeToken =  function() {
    $window.localStorage.removeItem('secret-token');
  }

  this.userLogout = function(){
    var authScope = this;
    authScope.removeToken();
    $location.path('/auth');
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


function AuthServices($http, $location, Auth){
  this.userSignup = function(user){
    var AuthServices = this;
    $http.post('/api/users', user).then(function success(res){
      console.log("post success", res);
      AuthServices.userLogin(user);
      // $location.path('/');
    }, function failure(res){
      console.log("post failure", res);
    })
  }

  this.userLogin = function(user){
    $http.post('/api/auth', user).then(function success(res){
      console.log("success: ", res);
      Auth.saveToken(res.data.token);
      $location.path('/portfolio');
    }, function error(res){
      console.log("error: ", res);
    })
  }

}

Auth.$inject = ['$window', '$location'];
AuthServices.$inject = ['$http', '$location', 'Auth'];
