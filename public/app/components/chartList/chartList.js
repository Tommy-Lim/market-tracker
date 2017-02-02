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
    },
    {
      Symbol: "BMY",
      Type: "price",
      Params: ["c"]
    }
  ]

  DataServices.getChartData(chartListComp.arr).then(function(data){

    if(data[0] == 'Request blockedExceeded requests/sec limit.'){
      if($window.alerts[0] && $window.alerts[0].msg == 'Sorry, Stock API request limit exceeded, please wait 1 min and try again'){
        // already exists
      } else{
        $window.alerts.push({msg: 'Sorry, Stock API request limit exceeded, please wait 1 min and try again', type: 'danger'});
      }
    }
    
    data.forEach(function(stock, index){

      $(function () {
        // Create the chart
        Highcharts.stockChart('container'+index, {
          rangeSelector: {
            selected: 1
          },
          title: {
            text: stock.symbol + ', ' + stock.currency,
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
