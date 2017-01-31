angular.module('App')
.component('stockComp', {
  templateUrl: 'app/containers/stock/stock.html',
  controller: StockCompCtrl,
  controllerAs: 'stockComp',
});

function StockCompCtrl($state, DataServices){
  stockComp = this;

  stockComp.quantity = null;
  stockComp.showBuy = false;
  stockComp.showPurchased = false;

  console.log($state.params.symbol);

  this.showForm = function(){
    stockComp.showBuy = !stockComp.showBuy;
  }

  this.submitBuy = function(quantity){
    console.log("quantity: ", quantity);
    stockComp.showBuy = !stockComp.showBuy;
    stockComp.showPurchased = true;
    setTimeout(function(){
      stockComp.quantity = null;
      stockComp.showPurchased = false;
    }, 3000);
  }

  DataServices.getStockDetails([$state.params.symbol], function(results) {
    stockComp.stock = results[0];
    console.log("stock: ", stockComp.stock)
  });
}

StockCompCtrl.$inject = ['$state', 'DataServices']
