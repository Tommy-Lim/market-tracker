angular.module('App')
.component('stockComp', {
  templateUrl: 'app/containers/stock/stock.html',
  controller: StockCompCtrl,
  controllerAs: 'stockComp',
});

function StockCompCtrl($state, $timeout,  DataServices){
  stockComp = this;

  stockComp.quantity = null;
  stockComp.showBuy = false;
  stockComp.showPurchased = false;

  this.showForm = function(){
    stockComp.showBuy = !stockComp.showBuy;
  }

  this.submitBuy = function(){
    console.log("buy hit for: ", $state.params.symbol);
    DataServices.buyStock($state.params.symbol, stockComp.quantity, function(data){
      console.log("buy data: ", data);
      stockComp.showBuy = !stockComp.showBuy;
      stockComp.showPurchased = true;

      $timeout(function(){
        stockComp.quantity = null;
        stockComp.showPurchased = false;
      }, 3000);

    });
  }

  this.watch = function(){
    console.log("watch hit for: ", $state.params.symbol);
    DataServices.watchStock($state.params.symbol).then(function(data){
      console.log("watch data: ", data);
    });
  }


  DataServices.getStockDetails([$state.params.symbol], function(results) {
    stockComp.stock = results[0];
  });
}

StockCompCtrl.$inject = ['$state', '$timeout', 'DataServices']
