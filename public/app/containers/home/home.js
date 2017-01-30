angular.module('App')
.component('homeComp', {
  templateUrl: 'app/containers/home/home.html',
  controller: HomeCompCtrl,
  controllerAs: 'homeComp'
});

function HomeCompCtrl(DataServices, AuthServices){
  var homeComp = this;

  // AuthServices.userSignup();
  // AuthServices.userLogin();
  // AuthServices.isLoggedIn();
  // AuthServices.userLogout();

  // DataServices.searchStocks();
  // DataServices.details();
  // DataServices.chart();
}

HomeCompCtrl.$inject = ['DataServices', 'AuthServices'];
