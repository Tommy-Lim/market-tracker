angular.module('App')
.component('stockComp', {
  templateUrl: 'app/containers/stock/stock.html',
  controller: StockCompCtrl,
  controllerAs: 'stockComp',
});

function StockCompCtrl($state, DataServices){
  stockComp = this;
  console.log($state.params.symbol);

  DataServices.getStockDetails([$state.params.symbol], function(results) {
    stockComp.stock = results[0];
    console.log("stock: ", stockComp.stock)
  });
}

StockCompCtrl.$inject = ['$state', 'DataServices']
