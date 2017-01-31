angular.module('App')
.component('portfolioComp', {
  templateUrl: 'app/containers/portfolio/portfolio.html',
  controller: PortfolioCompCtrl,
  controllerAs: 'portfolioComp'
});

function PortfolioCompCtrl(){
  var portfolioComp = this;

}

PortfolioCompCtrl.$inject = [];
