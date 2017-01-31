angular.module('App').component('compositeChartComp', {
    templateUrl: 'app/components/compositeChart/compositeChart.html',
    controller: CompositeChartCompCtrl,
    controllerAs: 'compositeChartComp'
});

function CompositeChartCompCtrl(DataServices) {
    compositeChartComp = this;

    DataServices.chart().then(function(data) {
        compositeChartComp.data = data;
        console.log("compositeChartComp data: ", compositeChartComp.data);
        compositeChartComp.data.Dates = DataServices.dateArrayToMs(compositeChartComp.data.Dates);
        compositeChartComp.chartData = [];
        compositeChartComp.data.Dates.forEach(function(date, index) {
            newDate = date;
            newValue = compositeChartComp.data.Elements[0].DataSeries.close.values[index];
            newPair = [newDate, newValue];
            compositeChartComp.chartData.push(newPair);
        })
    }).then(function() {

      $(function() {
        var seriesOptions = [];
        var names = compositeChartComp.data.Elements.map(function(item){
          return item.Symbol;
        });
        console.log(names);

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

        names.forEach(function(name, nameIndex){
          var data = [];
          compositeChartComp.data.Dates.forEach(function(date, index) {
              newDate = date;
              newValue = compositeChartComp.data.Elements[nameIndex].DataSeries.close.values[index];
              newPair = [newDate, newValue];
              data.push(newPair);
          })
          seriesOptions[nameIndex] = {
              name: name,
              data: data
          };
        })

        createChart();

      }); // end jquery wrapped functions

    }) // end function

}; // end compositeChartCompCtrl

CompositeChartCompCtrl.$inject = ['DataServices'];
