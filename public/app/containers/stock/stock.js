angular.module('App')
.component('stockComp', {
  templateUrl: 'app/containers/stock/stock.html',
  controller: StockCompCtrl,
  controllerAs: 'stockComp',
});

function StockCompCtrl($state, DataServices){
  console.log($state.params.symbol);

  DataServices.getStockDetails([$state.params.symbol], function(results) {
    console.log("data:", results);
  });
}

StockCompCtrl.$inject = ['$state', 'DataServices']
