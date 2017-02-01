angular.module('App')
.component('portfolioComp', {
  templateUrl: 'app/containers/portfolio/portfolio.html',
  controller: PortfolioCompCtrl,
  controllerAs: 'portfolioComp'
});

function PortfolioCompCtrl($state, DataServices){
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
      portfolioComp.watchlistSymbolsData = data;
    })
  });


  // GET DETAILS FOR PURCHASED STOCKS AT TIME OF PURCHASE AND CURRENT
  DataServices.getPurchased().then(function(data){
    // DATA FOR PURCHASED STOCKS AT TIME OF PURCHASE
    portfolioComp.purchasedPastData = data;
    console.log("purchased purchased data: ", portfolioComp.purchasedPastData);

    // CURRENT DATA FOR PURCHASED STOCKS
    portfolioComp.purchasedSymbols = portfolioComp.purchasedPastData.map(function(stock){
      return stock.stock.Symbol;
    })
    DataServices.getStockDetails(portfolioComp.purchasedSymbols, function(data) {
      portfolioComp.purchasedCurrentData = data;
      console.log("current purchased data: ", portfolioComp.purchasedCurrentData);
    })
  });

  portfolioComp.delete = function(symbol){
    console.log(symbol);
    DataServices.removeSymbolFromWatchlist(symbol).then(function(){
      console.log("reloading");
      $state.reload();
    });
  }


}

PortfolioCompCtrl.$inject = ['$state', 'DataServices'];
