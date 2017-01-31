angular.module('App')
.component('searchComp', {
  templateUrl: 'app/containers/search/search.html',
  controller: SearchCompCtrl,
  controllerAs: 'searchComp'
});


function SearchCompCtrl($state, DataServices){
  var searchComp = this;

  searchComp.query = $state.params.query;
  searchComp.results = null;

  searchComp.search = function(query){
    DataServices.searchStocks(query).then(function(data){
      searchComp.results = data.data;
      console.log("results: ", searchComp.results)
    });
  }

  if($state.params.query){
    searchComp.search($state.params.query);
  } else{
    
  }


}

SearchCompCtrl.$inject = ['$state', 'DataServices'];
