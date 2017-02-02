angular.module('App')
.component('stockComp', {
  templateUrl: 'app/containers/stock/stock.html',
  controller: StockCompCtrl,
  controllerAs: 'stockComp',
});

function StockCompCtrl($state, $timeout, $window, DataServices, Auth){
  stockComp = this;

  stockComp.quantity = null;
  stockComp.showBuy = false;
  stockComp.showPurchased = false;

  stockComp.isLoggedIn = function(){
    return Auth.isLoggedIn();
  }

  stockComp.showForm = function(){
    stockComp.showBuy = !stockComp.showBuy;
  }

  stockComp.submitBuy = function(){
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

  stockComp.watch = function(){
    console.log("watch hit for: ", $state.params.symbol);
    DataServices.watchStock($state.params.symbol).then(function(data){
      console.log("watch data: ", data);
    });
  }


  DataServices.getStockDetails([$state.params.symbol], function(results) {
    stockComp.stock = results[0];
  });
}

StockCompCtrl.$inject = ['$state', '$timeout', '$window', 'DataServices', 'Auth']
