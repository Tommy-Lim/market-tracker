angular.module('App')
.component('navbarComp', {
  templateUrl: 'app/components/navbar/navbar.html',
  controller: NavbarCompCtrl,
  controllerAs: 'navbarComp'
});

function NavbarCompCtrl($state, Auth){
  var navbarComp = this;
  navbarComp.query = "";

  navbarComp.logout = function(){
    console.log("logging out");
    Auth.userLogout();
  }

  navbarComp.isLoggedIn = function(){
    return Auth.isLoggedIn();
  }

  navbarComp.search = function() {
    console.log(navbarComp.query);
    $state.go('searchState({query: navbarComp.query})')
  }

}

NavbarCompCtrl.$inject = ['$state', 'Auth'];
