angular.module('App')
.component('compositeWatchlistComp', {
    templateUrl: 'app/components/compositeWatchlist/compositeWatchlist.html',
    controller: CompositeWatchlistCompCtrl,
    controllerAs: 'compositeWatchlistComp'
});

function CompositeWatchlistCompCtrl($timeout, DataServices) {
  compositeWatchlistComp = this;

  compositeWatchlistComp.chartLoading = true;
  compositeWatchlistComp.chartLoaded = false
  compositeWatchlistComp.message1 = "Loading chart";

  $timeout(function (){
    compositeWatchlistComp.message1 = "Loading chart failure: Too many API data requests/min";
    compositeWatchlistComp.message2 = "  Please wait 1 min and try again."
    compositeWatchlistComp.chartLoading = false;
  }, 2000);

  DataServices.getWatchlistSymbols().then(function(data){

    if(data.length>0){

      data = data.map(function(stock){
        return {
          Symbol: stock,
          Type: "price",
          Params: ["c"]
        }
      })


      DataServices.getChartData(data).then(function(data) {
        $(function() {
          var seriesOptions = [];

          var names = data.map(function(item){
            return item.symbol;
          });

          function createChart() {
            Highcharts.stockChart('composite-watchlist', {
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


    } else{
      // do nothing because empty watchlist
    }


  });



}; // end compositeChartCompCtrl

CompositeWatchlistCompCtrl.$inject = ['$timeout', 'DataServices'];
