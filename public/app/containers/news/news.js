angular.module('App')
.component('newsComp', {
  templateUrl: 'app/containers/news/news.html',
  controller: NewsCompCtrl,
  controllerAs: 'newsComp'
})

function NewsCompCtrl(DataServices){
  newsComp = this;

  newsComp.query = null;

  newsComp.search = function(query){
    query = encodeURIComponent(query);
    DataServices.searchNews(query).then(function(data){
      newsComp.articles = data;
      newsComp.queryResult = newsComp.query;
    });
  }

}

NewsCompCtrl.$inject = ['DataServices'];
