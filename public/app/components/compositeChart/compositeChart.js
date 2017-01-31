angular.module('App').component('compositeChartComp', {
    templateUrl: 'app/components/compositeChart/compositeChart.html',
    controller: CompositeChartCompCtrl,
    controllerAs: 'compositeChartComp'
});

function CompositeChartCompCtrl(DataServices) {
  compositeChartComp = this;

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

  DataServices.getChartData(arr).then(function(data) {

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

CompositeChartCompCtrl.$inject = ['DataServices'];