angular.module('App')
.component('portfolioComp', {
  templateUrl: 'app/containers/portfolio/portfolio.html',
  controller: PortfolioCompCtrl,
  controllerAs: 'portfolioComp'
});

function PortfolioCompCtrl($state, $window, $rootScope, DataServices){
  var portfolioComp = this;

  // WATCHLIST VARS
  portfolioComp.watchlistSymbols = [];
  if(!$rootScope.watchData){
    $rootScope.watchData = [];
  }

  // PURCHASED VARS
  if(!$rootScope.purchasedData){
    $rootScope.purchasedData = [];
  }
  portfolioComp.purchasedPastData = [];
  portfolioComp.purchasedSymbols = [];
  portfolioComp.purchasedCurrentData = [];


  // GET CURRENT DETAILS FOR WATCH LIST STOCKS
  DataServices.getWatchlistSymbols().then(function(data){
    portfolioComp.watchlistSymbols = data;
    // REMOVE STOCKS ALREADY STORED IN LOCAL STORAGE
    if($rootScope.watchData.length>0){
      $rootScope.watchData.forEach(function(stock, index){
        if(data.indexOf(stock.Symbol)<0){
          $rootScope.watchData.splice(index, 1);
        }
        portfolioComp.watchlistSymbols.splice(portfolioComp.watchlistSymbols.indexOf(stock.Symbol), 1);
      })
    }
    // GET STOCKS NOT STORED IN LOCAL STORAGE
    if(portfolioComp.watchlistSymbols.length>0){
      DataServices.getStockDetails(portfolioComp.watchlistSymbols, function(data) {
        if(data[0] == 'Request blockedExceeded requests/sec limit.'){
          if($window.alerts[0] && $window.alerts[0].msg == 'Sorry, Stock API request limit exceeded, please wait 1 min and try again'){
            // already exists
          } else{
            $window.alerts.push({msg: 'Sorry, Stock API request limit exceeded, please wait 1 min and try again', type: 'danger'});
          }
        }
        $rootScope.watchData = $rootScope.watchData.concat(data);
        portfolioComp.watchlistSymbolsData = $rootScope.watchData;
      })
    } else{
      portfolioComp.watchlistSymbolsData = $rootScope.watchData;
    }
  });


  // GET DETAILS FOR PURCHASED STOCKS AT TIME OF PURCHASE AND CURRENT
  DataServices.getPurchased().then(function(data){
    // DATA FOR PURCHASED STOCKS AT TIME OF PURCHASE
    if($rootScope.purchasedData.length == 0){
      $rootScope.purchasedData = data;
      portfolioComp.purchased = $rootScope.purchasedData;
    } else{
      data.forEach(function(stockFound, index){
        var pushStock = true;
        $rootScope.purchasedData.forEach(function(stockSaved, index2){
          if(stockFound.stock.Symbol == stockSaved.stock.Symbol){
            pushStock = false;
          }
        })
        if(pushStock){
          $rootScope.purchasedData.push(data[index]);
        }
        portfolioComp.purchased = $rootScope.purchasedData;
      })
      for(var i = $rootScope.purchasedData.length-1; i>=0; i--){
        var removeStock = true;
        data.forEach(function(stockFound){
          if($rootScope.purchasedData[i].stock.Symbol == stockFound.stock.Symbol){
            removeStock = false;
          }
        })
        if(removeStock){
          $rootScope.purchasedData.splice(i,1);
          portfolioComp.purchased = $rootScope.purchasedData;
        }
      }
    }
    // CURRENT DATA FOR PURCHASED STOCKS
    $rootScope.purchasedData.forEach(function(stock){
      if(!stock.current){
        portfolioComp.purchasedSymbols.push(stock.stock.Symbol);
      }
    })

    if(portfolioComp.purchasedSymbols.length>0){
      DataServices.getStockDetails(portfolioComp.purchasedSymbols, function(data) {
        if(data[0] == 'Request blocked. Exceeded requests/sec limit.'){
          if($window.alerts[0] && $window.alerts[0].msg == 'Sorry, Stock API request limit exceeded, please wait 1 min and try again'){
            // already exists
          } else{
            $window.alerts.push({msg: 'Sorry, Stock API request limit exceeded, please wait 1 min and try again', type: 'danger'});
          }
        }
        // portfolioComp.purchasedCurrentData = data;
        data.forEach(function(stockFound){
          $rootScope.purchasedData.forEach(function(stockSaved, index){
            if(stockFound.Symbol == stockSaved.stock.Symbol){
              $rootScope.purchasedData[index].current = stockFound;
              portfolioComp.purchased = $rootScope.purchasedData;
            }
          })
        })
        portfolioComp.calculateTotalGains($rootScope.purchasedData);
      })
    }

  });

  portfolioComp.calculateTotalGains = function(arr){
    portfolioComp.totalGains = 0;
    portfolioComp.totalSpent = 0;
    portfolioComp.totalOwned = 0;

    if(arr.length>0){
      arr.forEach(function(stock){
        portfolioComp.totalGains += (stock.current.LastPrice - stock.stock.LastPrice)*stock.quantity;
        portfolioComp.totalSpent += stock.stock.LastPrice*stock.quantity;
      })
    }
  }

  // DELETE WATCHLIST ITEM
  portfolioComp.deleteWatchlistItem = function(symbol){
    DataServices.removeSymbolFromWatchlist(symbol).then(function(){
      $state.reload();
    });
  }

  // DELETE PURCHASE
  portfolioComp.deletePurchase = function(purchaseId, symbol, quantity){
    DataServices.removePurchase(purchaseId, symbol, quantity).then(function(){
      $state.reload();
    });
  }




}

PortfolioCompCtrl.$inject = ['$state', '$window', '$rootScope', 'DataServices'];
