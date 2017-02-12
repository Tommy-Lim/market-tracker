angular.module('App')
.component('compositeChartComp', {
    templateUrl: 'app/components/compositeChart/compositeChart.html',
    controller: CompositeChartCompCtrl,
    controllerAs: 'compositeChartComp'
});

function CompositeChartCompCtrl($timeout, DataServices) {
  compositeChartComp = this;

  compositeChartComp.chartLoading = true;
  compositeChartComp.chartLoaded = false
  compositeChartComp.message1 = "Loading chart";

  $timeout(function (){
    compositeChartComp.message1 = "Loading chart failure: Too many API data requests/min";
    compositeChartComp.message2 = "  Please wait 1 min and try again."
    compositeChartComp.chartLoading = false;
  }, 2000);

  arr = [
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
      Symbol: "NFLX",
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
      Symbol: "MSFT",
      Type: "price",
      Params: ["c"]
    },
    {
      Symbol: "FB",
      Type: "price",
      Params: ["c"]
    }
  ]

  DataServices.getChartData(arr).then(function(data) {

    if(data[0] == 'Request blockedExceeded requests/sec limit.'){
      if($window.alerts[0] && $window.alerts[0].msg == 'Sorry, Stock API request limit exceeded, please wait 1 min and try again'){
        // already exists
      } else{
        $window.alerts.push({msg: 'Sorry, Stock API request limit exceeded, please wait 1 min and try again', type: 'danger'});
      }
    }

    $(function() {
      var seriesOptions = [];

      var names = data.map(function(item){
        return item.symbol;
      });

      function createChart() {
        Highcharts.stockChart('composite', {
          rangeSelector: {
            selected: 4
          },
          yAxis: {
            labels: {
              formatter: function() {
                return (this.value > 0
                    ? ' + '
                    : '') + this.value + '%';
              }
            },
            plotLines: [
              {
                value: 0,
                width: 2,
                color: 'silver'
              }
            ]
          },
          plotOptions: {
            series: {
              compare: 'percent',
              showInNavigator: true
            }
          },
          tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
            valueDecimals: 2,
            split: true
          },
          series: seriesOptions
        });
      } // end createChart

      data.forEach(function(entry, index){
        seriesOptions[index] = {
            name: entry.symbol,
            data: entry.data
        };
      })

      createChart();

    }); // end jquery wrapped functions

  }); //end of DataServices

}; // end compositeChartCompCtrl

CompositeChartCompCtrl.$inject = ['$timeout', 'DataServices'];
