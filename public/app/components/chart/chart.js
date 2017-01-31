angular.module('App')
.component('chartComp', {
  templateUrl: 'app/components/chart/chart.html',
  controller: ChartCompCtrl,
  controllerAs: 'chartComp',
});

function ChartCompCtrl(DataServices){
  chartComp = this;

  arr = [
    {
      Symbol: "AAPL",
      Type: "price",
      Params: ["c"]
    }
  ]

  DataServices.getChartData(arr).then(function(data){

    $(function () {
      // Create the chart
      Highcharts.stockChart('container', {
        rangeSelector: {
          selected: 1
        },
        title: {
          text: data[0].symbol + ' Stock Price, ' + data[0].currency,
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

ChartCompCtrl.$inject = ['DataServices'];
