angular.module('App')
.component('authComp', {
  templateUrl: 'app/containers/auth/auth.html',
  controller: AuthCompCtrl,
  controllerAs: 'authComp'
});

function AuthCompCtrl(AuthServices){
  var authComp = this;

  document.getElementById("login-email").focus();

  authComp.loginUser = {
    email: "",
    password: ""
  };

  authComp.signupUser = {
    email: "",
    password: ""
  }

  authComp.login = function(){
    AuthServices.userLogin(authComp.loginUser);
  }

  authComp.signup = function(){
    AuthServices.userSignup(authComp.signupUser);
  }

}

AuthCompCtrl.$inject = ['AuthServices'];
