angular.module('App')
.component('stockNewsComp', {
  templateUrl: 'app/components/stockNews/stockNews.html',
  controller: StockNewsCompCtrl,
  controllerAs: 'stockNewsComp'
})

function StockNewsCompCtrl($state, DataServices){
  stockNewsComp = this;

  stockNewsComp.isLoading = false;

  stockNewsComp.limits = {
    availableOptions: [
      {id: 1, num: 10},
      {id: 2, num: 25},
      {id: 3, num: 50},
      {id: 4, num: 100},
    ],
    selectedOption: {id: 1, num: 10} //This sets the default value of the select in the ui
  };

  stockNewsComp.getResults = function(symbol){
    symbol = encodeURIComponent(symbol);
    stockNewsComp.isLoading = true;
    DataServices.searchNews(symbol).then(function(data){
      stockNewsComp.articles = data;
      stockNewsComp.isLoading = false;
      stockNewsComp.symbolResult = symbol;
    });
  }
  console.log("STATE:", $state.params.symbol)
  if($state.params.symbol){
    stockNewsComp.getResults($state.params.symbol)
  }

}

StockNewsCompCtrl.$inject = ['$state', 'DataServices'];
