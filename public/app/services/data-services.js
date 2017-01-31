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
      console.log("chart success");
      return res.data;
    }, function failure(res) {
        console.log("chart failure");
    });
  }

  this.dateArrayToMs = function(arr){
    return arr = arr.map(function(item){
      var date = new Date(item);
      var ms = date.getTime();
      return ms;
    })
  }


}

DataServices.$inject = ['$http'];
