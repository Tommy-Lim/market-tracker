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
    portfolioComp.purchasedPastData = data;
    console.log("purchasedPastData: ", portfolioComp.purchasedPastData);

    // CURRENT DATA FOR PURCHASED STOCKS
    portfolioComp.purchasedSymbols = portfolioComp.purchasedPastData.map(function(stock){
      return stock.stock.Symbol;
    })
    DataServices.getStockDetails(portfolioComp.purchasedSymbols, function(data) {
      if(data[0] == 'Request blockedExceeded requests/sec limit.'){
        if($window.alerts[0] && $window.alerts[0].msg == 'Sorry, Stock API request limit exceeded, please wait 1 min and try again'){
          // already exists
        } else{
          $window.alerts.push({msg: 'Sorry, Stock API request limit exceeded, please wait 1 min and try again', type: 'danger'});
        }
      }
      portfolioComp.purchasedCurrentData = data;
      console.log("purchasedCurrentData: ", portfolioComp.purchasedCurrentData);
    })
  });

  portfolioComp.deleteWatchlistItem = function(symbol){
    DataServices.removeSymbolFromWatchlist(symbol).then(function(){
      $state.reload();
    });
  }

  portfolioComp.deletePurchase = function(purchaseId){
    console.log("front end id: ", purchaseId);
    
  }


}

PortfolioCompCtrl.$inject = ['$state', '$window', 'DataServices'];
