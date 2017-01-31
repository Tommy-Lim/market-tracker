angular.module('App')
.component('searchComp', {
  templateUrl: 'app/containers/search/search.html',
  controller: SearchCompCtrl,
  controllerAs: 'searchComp'
});


function SearchCompCtrl($state, DataServices){
  var searchComp = this;

  searchComp.query = null;
  searchComp.results = null;

  searchComp.search = function(query){
    DataServices.searchStocks(query).then(function(data){
      searchComp.results = data.data;
      console.log("results: ", searchComp.results)
    });
  }

  searchComp.search($state.params.query);
}

SearchCompCtrl.$inject = ['$state', 'DataServices'];
