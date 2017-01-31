angular.module('App')
.component('chartComp', {
  templateUrl: 'app/components/chart/chart.html',
  controller: ChartCompCtrl,
  controllerAs: 'chartComp',
});

function ChartCompCtrl(DataServices){
  chartComp = this;

  DataServices.chart().then(function(data){
    chartComp.data = data;
    console.log("chartComp data: ", chartComp.data);
    chartComp.data.Dates = DataServices.dateArrayToMs(chartComp.data.Dates);
    chartComp.chartData = [];
    chartComp.data.Dates.forEach(function(date, index){
      newDate = date;
      newValue = chartComp.data.Elements[0].DataSeries.close.values[index];
      newPair = [newDate, newValue];
      chartComp.chartData.push(newPair);
    })
  }).then(function(){

    $(function () {
      // Create the chart
      console.log("Chart data: ", chartComp.chartData);
      Highcharts.stockChart('container', {
        rangeSelector: {
          selected: 1
        },
        title: {
          text: chartComp.data.Elements[0].Symbol+' Stock Price, ' + chartComp.data.Elements[0].Currency,
        },
        series: [{
          name: chartComp.data.Elements[0].Symbol+' Stock Price, ' + chartComp.data.Elements[0].Currency,
          data: chartComp.chartData,
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
      });
    });

  })


};

ChartCompCtrl.$inject = ['DataServices'];
