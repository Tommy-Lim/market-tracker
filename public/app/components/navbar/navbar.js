angular.module('App')
.component('navbarComp', {
  templateUrl: 'app/components/navbar/navbar.html',
  controller: NavbarCompCtrl,
  controllerAs: 'navbarComp'
});

function NavbarCompCtrl(AuthServices){
  var navbarComp = this;

  navbarComp.logout = function(){
    console.log("logging out");
    AuthServices.userLogout();
  }

  navbarComp.isLoggedIn = function(){
    return AuthServices.isLoggedIn();
  }

}

NavbarCompCtrl.$inject = ['AuthServices'];
