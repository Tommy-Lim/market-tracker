angular.module('App')
.component('portfolioComp', {
  templateUrl: 'app/containers/portfolio/portfolio.html',
  controller: PortfolioCompCtrl,
  controllerAs: 'portfolioComp'
});

function PortfolioCompCtrl(DataServices){
  var portfolioComp = this;
    var array = ['BA', 'AAPL'];
    DataServices.getStockDetails(array).then(function(data){
      console.log(data);
    })

}

PortfolioCompCtrl.$inject = ['DataServices'];
