angular.module('App')
.component('chartComp', {
  templateUrl: 'app/components/chart/chart.html',
  controller: ChartCompCtrl,
  controllerAs: 'chartComp',
});

function ChartCompCtrl($state, $timeout, DataServices){
  chartComp = this;

  chartComp.symbol = $state.params.symbol;
  chartComp.chartLoading = true;
  chartComp.chartLoaded = false
  chartComp.message1 = "Loading chart";

  $timeout(function (){
    chartComp.message1 = "Loading chart failure: Too many API data requests/min";
    chartComp.message2 = "  Please wait 1 min and try again."
    chartComp.chartLoading = false;
  }, 2000);

  arr = [
    {
      Symbol: chartComp.symbol,
      Type: "price",
      Params: ["c"]
    }
  ]

  DataServices.getChartData(arr).then(function(data){
    // console.log(data);
    chartComp.chartLoaded = true;
    $(function () {
      // Create the chart
      Highcharts.stockChart('container', {
        rangeSelector: {
          selected: 1
        },
        title: {
          text: data[0].symbol + ', ' + data[0].currency,
        },
        series: [{
          name: data[0].symbol,
          data: data[0].data,
          type: 'area',
          threshold: null,
          tooltip: {
            valueDecimals: 2
          },
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            stops: [
              [0, Highcharts.getOptions().colors[0]],
              [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
            ]
          }
        }]
      }); // end Highcharts.stockChart
    }); // end $function
  }) // end DataServices

};

ChartCompCtrl.$inject = ['$state', '$timeout', 'DataServices'];
