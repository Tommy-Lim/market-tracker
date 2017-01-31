angular.module('App')
.component('portfolioComp', {
  templateUrl: 'app/containers/portfolio/portfolio.html',
  controller: PortfolioCompCtrl,
  controllerAs: 'portfolioComp'
});

function PortfolioCompCtrl(DataServices){
  var portfolioComp = this;
    var array = ['BA', 'AAPL'];
    DataServices.getStockDetails(array, function(data) {
      console.log("this is data", data);
      portfolioComp.data = data;
    })

}

PortfolioCompCtrl.$inject = ['DataServices'];
