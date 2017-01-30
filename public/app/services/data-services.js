angular.module('App')
.service('DataServices', DataServices);

function DataServices($http){

  this.test = function(){
    console.log("Data Services hit");
  }

  this.searchStocks = function() {
    var stock = "A";
    var req = {
      url: 'http://dev.markitondemand.com/MODApis/Api/v2/Lookup/json',
      method: "GET",
      params: {
        input: stock,
      }
    }

    $http(req).then(function success(res) {
      console.log("success");
    }, function failure(res) {
        console.log("failure");
    });
  }

  this.details = function() {
    var oneStock = "BA";
    var req = {
      url: 'http://dev.markitondemand.com/MODApis/Api/v2/Quote/json',
      method: "GET",
      params: {
        symbol: oneStock,
      }
    }

    $http(req).then(function success(res) {
      console.log("success")
    }, function failure(res) {
        console.log("failure");
    });
  }

  this.chart = function() {
    var chart = "BA";
    var req = {
      url: 'http://dev.markitondemand.com/Api/v2/InteractiveChart/json',
      method: "GET",
      params: {
        parameters: chart,
      }
    }

    $http(req).then(function success(res) {
      console.log("success")
    }, function failure(res) {
        console.log("failure");
    });
  }


}

DataServices.$inject = ['$http'];
