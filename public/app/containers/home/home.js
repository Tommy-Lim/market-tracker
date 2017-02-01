angular.module('App')
.component('homeComp', {
  templateUrl: 'app/containers/home/home.html',
  controller: HomeCompCtrl,
  controllerAs: 'homeComp'
});

function HomeCompCtrl(DataServices, AuthServices, Auth){
  var homeComp = this;

  DataServices.getNews().then(function(data){
    console.log("news data: ", data);
    homeComp.articles = data;
  });
}

HomeCompCtrl.$inject = ['DataServices', 'AuthServices', 'Auth'];
