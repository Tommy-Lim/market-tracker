angular.module('App')
.component('portfolioComp', {
  templateUrl: 'app/containers/portfolio/portfolio.html',
  controller: PortfolioCompCtrl,
  controllerAs: 'portfolioComp'
});

function PortfolioCompCtrl($state, $window, DataServices){
  var portfolioComp = this;

  // DECLARE VARS
  portfolioComp.watchlistSymbols = [];
  portfolioComp.watchlistSymbolsData = [];
  portfolioComp.purchasedPastData = [];
  portfolioComp.purchasedSymbols = [];
  portfolioComp.purchasedCurrentData = [];


  // GET CURRENT DETAILS FOR WATCH LIST STOCKS
  DataServices.getWatchlistSymbols().then(function(data){
    portfolioComp.watchlistSymbols = data;

    DataServices.getStockDetails(portfolioComp.watchlistSymbols, function(data) {

      if(data[0] == 'Request blockedExceeded requests/sec limit.'){
        if($window.alerts[0] && $window.alerts[0].msg == 'Sorry, Stock API request limit exceeded, please wait 1 min and try again'){
          // already exists
        } else{
          $window.alerts.push({msg: 'Sorry, Stock API request limit exceeded, please wait 1 min and try again', type: 'danger'});
        }
      }

      portfolioComp.watchlistSymbolsData = data;
    })
  });


  // GET DETAILS FOR PURCHASED STOCKS AT TIME OF PURCHASE AND CURRENT
  DataServices.getPurchased().then(function(data){
    // DATA FOR PURCHASED STOCKS AT TIME OF PURCHASE
    portfolioComp.purchased = data;

    // CURRENT DATA FOR PURCHASED STOCKS
    portfolioComp.purchasedSymbols = portfolioComp.purchased.map(function(stock){
      return stock.stock.Symbol;
    })
    DataServices.getStockDetails(portfolioComp.purchasedSymbols, function(data) {
      if(data[0] == 'Request blocked. Exceeded requests/sec limit.'){
        if($window.alerts[0] && $window.alerts[0].msg == 'Sorry, Stock API request limit exceeded, please wait 1 min and try again'){
          // already exists
        } else{
          $window.alerts.push({msg: 'Sorry, Stock API request limit exceeded, please wait 1 min and try again', type: 'danger'});
        }
      }
      portfolioComp.purchasedCurrentData = data;
      portfolioComp.purchased.forEach(function(item1, index){
        portfolioComp.purchasedCurrentData.forEach(function(item2, index){
          if(item1.stock.Symbol == item2.Symbol){
            item1.current = item2;
          }
        })
      })
      console.log("purchased: ", portfolioComp.purchased);
    })
  });

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

PortfolioCompCtrl.$inject = ['$state', '$window', 'DataServices'];
