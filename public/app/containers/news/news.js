angular.module('App')
.component('newsComp', {
  templateUrl: 'app/containers/news/news.html',
  controller: NewsCompCtrl,
  controllerAs: 'newsComp'
})

function NewsCompCtrl($state, DataServices){
  newsComp = this;

  newsComp.query = $state.params.query;
  newsComp.isLoading = false;

  newsComp.limits = {
    availableOptions: [
      {id: 1, num: 10},
      {id: 2, num: 25},
      {id: 3, num: 50},
      {id: 4, num: 100},
    ],
    selectedOption: {id: 1, num: 10} //This sets the default value of the select in the ui
  };

  newsComp.search = function(query){
    $state.go('newsState', {query: newsComp.query})
  }

  newsComp.getResults = function(query){
    query = encodeURIComponent(query);
    newsComp.isLoading = true;
    DataServices.searchNews(query).then(function(data){
      newsComp.articles = data;
      newsComp.isLoading = false;
      newsComp.queryResult = newsComp.query;
    });
  }

  if($state.params.query){
    newsComp.getResults($state.params.query)
  }

}

NewsCompCtrl.$inject = ['$state', 'DataServices'];
