angular.module('App')
.component('stockComp', {
  templateUrl: 'app/containers/stock/stock.html',
  controller: StockCompCtrl,
  controllerAs: 'stockComp',
});

function StockCompCtrl($state, $timeout, $window, DataServices, Auth){
  stockComp = this;
  stockComp.document = document;

  stockComp.quantity = null;
  stockComp.showBuy = false;
  stockComp.showPurchased = false;



  stockComp.isWatching = function(){
    return DataServices.getWatchlistSymbols().then(function(data){
      console.log("data: ", data);
      if(data.indexOf($state.params.symbol)>=0){
        console.log("true");
        return true
      } else{
        console.log("false");
        return false;
      }
    })
  }

  stockComp.isLoggedIn = function(){
    return Auth.isLoggedIn();
  }

  stockComp.showForm = function(){
    stockComp.showBuy = !stockComp.showBuy;
  }

  stockComp.submitBuy = function(){
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
    DataServices.getWatchlistSymbols().then(function(data){
      console.log("data: ", data);
      if(data.indexOf($state.params.symbol)>=0){
        $window.alerts.push({msg: $state.params.symbol + ' already in Watchlist.'})
      } else{
        DataServices.watchStock($state.params.symbol).then(function(data){
          console.log("watch data: ", data);
        });
      }
    })
  }


  DataServices.getStockDetails([$state.params.symbol], function(data) {
    if(data[0] == 'Request blockedExceeded requests/sec limit.'){
      if($window.alerts[0] && $window.alerts[0].msg == 'Sorry, Stock API request limit exceeded, please wait 1 min and try again'){
        // already exists
      } else{
        $window.alerts.push({msg: 'Sorry, Stock API request limit exceeded, please wait 1 min and try again', type: 'danger'});
      }
    }
    stockComp.stock = data[0];
  });
}

StockCompCtrl.$inject = ['$state', '$timeout', '$window', 'DataServices', 'Auth']
