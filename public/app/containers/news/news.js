angular.module('App')
.component('newsComp', {
  templateUrl: 'app/containers/news/news.html',
  controller: NewsCompCtrl,
  controllerAs: 'newsComp'
})

function NewsCompCtrl(){
  newsComp = this;
}

NewsCompCtrl.$inject = [];
