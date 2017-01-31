angular.module('App')
.component('navbarComp', {
  templateUrl: 'app/components/navbar/navbar.html',
  controller: NavbarCompCtrl,
  controllerAs: 'navbarComp'
});

function NavbarCompCtrl($state, Auth){
  var navbarComp = this;

  navbarComp.logout = function(){
    console.log("logging out");
    Auth.userLogout();
  }

  navbarComp.isLoggedIn = function(){
    return Auth.isLoggedIn();
  }

}

NavbarCompCtrl.$inject = ['$state', 'Auth'];
