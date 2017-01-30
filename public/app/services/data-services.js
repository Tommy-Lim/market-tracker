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
    var chart = "BA";
    var req = {
      url: 'http://dev.markitondemand.com/Api/v2/InteractiveChart/json',
      method: "GET",
      }

    $http(req).then(function success(res) {
      console.log("success")
    }, function failure(res) {
        console.log("failure");
    });
  }


}

DataServices.$inject = ['$http'];
