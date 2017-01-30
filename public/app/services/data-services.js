angular.module('App')
.service('DataServices', DataServices);

function DataServices($http){

  this.test = function(){
    console.log("Data Services hit");
  }

  this.searchStocks = function() {
    var stock = "A";
    var req = {
      url: '/api/stocks/lookup/' + stock,
      method: "GET",
    }

    $http(req).then(function success(res) {
      console.log("success");
      console.log(res);
    }, function failure(res) {
        console.log("failure");
    });
  }

  this.details = function() {
    var oneStock = "BA";
      var req = {
        url: '/api/stocks/quote/' + oneStock,
        method: "GET",
        }

      $http(req).then(function success(res) {
        console.log("success");
        console.log(res);
      }, function failure(res) {
          console.log("failure");
      });
  }

  this.chart = function() {
    var chartDataObject = {
      Normalized: false,
      NumberOfDays: 365,
      DataPeriod: "Day",
      Elements:[
        {
          Symbol: "AAPL",
          Type: "price",
          Params: ["c"]
        }
      ]
    };
    var json = JSON.stringify(chartDataObject);
    var url = encodeURIComponent(json);
    console.log(url);
    var req = {
      url: '/api/stocks/chart/' + url,
      method: "GET",
    }

    return $http(req).then(function success(res) {
      console.log("chart success: ", res.data);
      return res.data;
    }, function failure(res) {
        console.log("chart failure");
    });
  }


}

DataServices.$inject = ['$http'];
