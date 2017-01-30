angular.module('App')
.component('homeComp', {
  templateUrl: 'app/containers/home/home.html',
  controller: HomeCompCtrl,
  controllerAs: 'homeComp'
});

function HomeCompCtrl(DataServices, AuthServices){
  var homeComp = this;
  DataServices.test();
  AuthServices.test();
  DataServices.searchStocks();
}

HomeCompCtrl.$inject = ['DataServices', 'AuthServices'];
