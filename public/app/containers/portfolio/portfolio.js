angular.module('App')
.component('portfolioComp', {
  templateUrl: 'app/containers/portfolio/portfolio.html',
  controller: PortfolioCompCtrl,
  controllerAs: 'portfolioComp'
});

function PortfolioCompCtrl(DataServices){
  var portfolioComp = this;

  portfolioComp.watchlist = [];
  portfolioComp.purchased = [];

  DataServices.getWatchlist().then(function(data){
    portfolioComp.watchlist = data;

    DataServices.getStockDetails(portfolioComp.watchlist, function(data) {
      portfolioComp.watchlistData = data;
    })
  });

  DataServices.getPurchased().then(function(data){
    portfolioComp.purchased = data;
  });


}

PortfolioCompCtrl.$inject = ['DataServices'];
