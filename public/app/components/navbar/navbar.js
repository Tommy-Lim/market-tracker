angular.module('App')
.component('navbarComp', {
  templateUrl: 'app/components/navbar/navbar.html',
  controller: NavbarCompCtrl,
  controllerAs: 'navbarComp'
});

function NavbarCompCtrl($state, $window, Auth){
  var navbarComp = this;
  navbarComp.query = "";

  navbarComp.logout = function(){
    Auth.userLogout();
  }

  navbarComp.isLoggedIn = function(){
    return Auth.isLoggedIn();
  }

  navbarComp.search = function() {
    $state.go('searchState', {query: navbarComp.query})
  }

}

NavbarCompCtrl.$inject = ['$state', '$window', 'Auth'];
