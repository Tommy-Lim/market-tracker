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
    $window.alerts.push({msg: 'User logged out', type: 'success'});
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


function AuthServices($window, $http, $location, Auth){
  this.userSignup = function(user){
    var AuthServices = this;
    $http.post('/api/users', user).then(function success(res){
      console.log("post success", res);
      $window.alerts.push({msg: 'User signed up - Welcome!', type: 'success'});
      AuthServices.userLogin(user);
      // $location.path('/');
    }, function failure(res){
      console.log("post failure", res);
      $window.alerts.push({msg: res.data.message, type: 'danger'});
      $location.path('/auth');
    })
  }

  this.userLogin = function(user){
    $http.post('/api/auth', user).then(function success(res){
      console.log("success: ", res);
      Auth.saveToken(res.data.token);
      $window.alerts.push({msg: 'User logged in', type: 'success'});
      $location.path('/portfolio');
    }, function error(res){
      console.log("error: ", res);
      $window.alerts.push({msg: res.data.message, type: 'danger'});
      $location.path('/auth');
    })
  }

}

Auth.$inject = ['$window', '$location'];
AuthServices.$inject = ['$window', '$http', '$location', 'Auth'];
