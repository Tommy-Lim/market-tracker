angular.module('App')
.component('stockComp', {
  templateUrl: 'app/containers/stock/stock.html',
  controller: StockCompCtrl,
  controllerAs: 'stockComp',
});

function StockCompCtrl($state, $timeout, $window, $location, DataServices, Auth){
  stockComp = this;

  stockComp.quantity = null;
  stockComp.showBuy = false;
  stockComp.showPurchased = false;
  stockComp.isWatchingBoolean = false;
  stockComp.ownedShares = 0;

  stockComp.numberOwned = function(){
    if(Auth.isLoggedIn()){
      DataServices.getPurchased().then(function(data){
        // console.log("purchases: ", data);
        stockComp.ownedShares = 0;
        data.forEach(function(entry){
          if(entry.stock.Symbol == $state.params.symbol){
            stockComp.ownedShares = stockComp.ownedShares + entry.quantity;
          }
        })
      })
    } else{
      // do nothing because not logged in
    }
  }

  stockComp.isWatching = function(){
    if(Auth.isLoggedIn()){
      return DataServices.getWatchlistSymbols().then(function(data){
        if(data.indexOf($state.params.symbol)>=0){
          stockComp.isWatchingBoolean = true;
          return true
        } else{
          stockComp.isWatchingBoolean = false;
          return false;
        }
      })
    } else{
      stockComp.isWatchingBoolean = false;
      return false;
    }
  }

  stockComp.isLoggedIn = function(){
    return Auth.isLoggedIn();
  }

  stockComp.showForm = function(){
    stockComp.showBuy = !stockComp.showBuy;
  }

  stockComp.submitBuy = function(){
    DataServices.buyStock($state.params.symbol, stockComp.quantity, function(data){
      stockComp.numberOwned();
    });
  }

  stockComp.watch = function(){
    DataServices.getWatchlistSymbols().then(function(data){
      if(data.indexOf($state.params.symbol)>=0){
        $window.alerts.push({msg: $state.params.symbol + ' already in Watchlist.'})
      } else{
        DataServices.watchStock($state.params.symbol).then(function(data){
          // $state.reload();
          stockComp.isWatchingBoolean = true;
        });
      }
    })
  }

  stockComp.delete = function(symbol){
    DataServices.removeSymbolFromWatchlist($state.params.symbol);
    stockComp.isWatchingBoolean = false;
    // $state.reload();
  }

  stockComp.isWatching();
  stockComp.numberOwned();

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

StockCompCtrl.$inject = ['$state', '$timeout', '$window', '$location', 'DataServices', 'Auth']
