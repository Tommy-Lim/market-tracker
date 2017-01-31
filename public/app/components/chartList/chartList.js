angular.module('App')
.component('chartListComp', {
  templateUrl: 'app/components/chartList/chartList.html',
  controller: ChartListCompCtrl,
  controllerAs: 'chartListComp'
});

function ChartListCompCtrl(DataServices){
  chartListComp = this;

  chartListComp.arr = [
    {
      Symbol: "AAPL",
      Type: "price",
      Params: ["c"]
    },
    {
      Symbol: "GOOGL",
      Type: "price",
      Params: ["c"]
    },
    {
      Symbol: "BA",
      Type: "price",
      Params: ["c"]
    },
    {
      Symbol: "AMZN",
      Type: "price",
      Params: ["c"]
    },
    {
      Symbol: "TSLA",
      Type: "price",
      Params: ["c"]
    }
  ]

  DataServices.getChartData(chartListComp.arr).then(function(data){
    data.forEach(function(stock, index){

      $(function () {
        // Create the chart
        Highcharts.stockChart('container'+index, {
          rangeSelector: {
            selected: 1
          },
          title: {
            text: stock.symbol + ' Stock Price, ' + stock.currency,
          },
          series: [{
            name: stock.symbol,
            data: stock.data,
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

    }) // end of for each
  }) // end DataServices

}

ChartListCompCtrl.$inject = ['DataServices'];
