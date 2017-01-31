angular.module('App')
.component('chartListComp', {
  templateUrl: 'app/components/chartList/chartList.html',
  controller: ChartListCompCtrl,
  controllerAs: 'chartListComp'
});

function ChartListCompCtrl(){
  chartListComp = this;

}

ChartListCompCtrl.$inject = [];
