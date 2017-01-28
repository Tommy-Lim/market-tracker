angular.module('App')
.component('homeComp', {
  templateUrl: 'app/containers/home/home.html',
  controller: HomeCompCtrl,
  controllerAs: 'homeComp'
});

function HomeCompCtrl(DataServices){
  var homeComp = this;
  DataServices.test();
}

HomeCompCtrl.$inject = ['DataServices'];
