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
    navbarComp.showOverlayVar = false;
    $state.go('searchState', {query: navbarComp.query})
  }

  navbarComp.showOverlay = function(){
    navbarComp.showOverlayVar = true;
  }

  navbarComp.hideOverlay = function(){
    navbarComp.showOverlayVar = false;
  }

  navbarComp.toggleOverlay = function(){
    navbarComp.showOverlayVar = !navbarComp.showOverlayVar;
  }

}

NavbarCompCtrl.$inject = ['$state', '$window', 'Auth'];
