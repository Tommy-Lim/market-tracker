angular.module('App')
.component('newsComp', {
  templateUrl: 'app/containers/news/news.html',
  controller: NewsCompCtrl,
  controllerAs: 'newsComp'
})

function NewsCompCtrl(DataServices){
  newsComp = this;

  newsComp.query = "";

  DataServices.searchNews();
}

NewsCompCtrl.$inject = ['DataServices'];
