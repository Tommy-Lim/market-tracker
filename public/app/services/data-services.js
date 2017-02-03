angular.module('App')
.service('DataServices', DataServices);

function DataServices($http, $window, $location){

  this.searchStocks = function(query) {
    var req = {
      url: '/api/stocks/lookup/' + query,
      method: "GET",
    }

    return $http(req).then(function success(res) {
      return res;
    }, function failure(res) {
      $window.alerts.push({msg: 'Sorry, Stock API request limit exceeded, please wait 1 min and try again', type: 'danger'});
      $location.path('/');
    });
  }

  this.getStockDetails = function(stockArray, cb) {
    var results = [];
    var numErrors = 0;
    stockArray.forEach(function(stock) {
      var req = {
        url: '/api/stocks/quote/' + stock,
        method: "GET",
      }
      $http(req).then(function success(res) {
        results.push(res.data);
        if (stockArray.length === (results.length+ numErrors)) {
          cb(results);
        }
      }, function failure(res) {
        $window.alerts.push({msg: 'Sorry, Stock API request limit exceeded, please wait 1 min and try again', type: 'danger'});
        $location.path('/');
        numErrors++;
        if (stockArray.length === (results.length+ numErrors)) {
          cb(results);
        }
      });
    })
  }

  this.getChartData = function(symbolsArr) {
    var dataScope = this;
    var chartRequestObject = {
      Normalized: false,
      NumberOfDays: 730,
      DataPeriod: "Day",
      Elements: symbolsArr
    };
    var json = JSON.stringify(chartRequestObject);
    var url = encodeURIComponent(json);
    var req = {
      url: '/api/stocks/chart/' + url,
      method: "GET"
    }

    return $http(req).then(function success(res) {

      var chartDataArray = [];
      var UTCdates = res.data.Dates;
      var dates = [];

      dates = UTCdates.map(function(date, dateIndex){
        return new Date(date).getTime();
      })

      res.data.Elements.forEach(function(element, elemIndex){
        chartDataArray.push({
          symbol: element.Symbol,
          currency: element.Currency,
          type: element.Type,
          data: []
        });
        dates.forEach(function(date, dateIndex){
          var value = res.data.Elements[elemIndex].DataSeries.close.values[dateIndex];
          chartDataArray[elemIndex].data.push([date, value]);
        })
      })

      return chartDataArray;
    }, function failure(res) {
      $window.alerts.push({msg: 'Sorry, Stock API request limit exceeded, please wait 1 min and try again', type: 'danger'});
      $location.path('/');
    });
  }

  this.dateArrayToMs = function(arr){
    return arr = arr.map(function(item){
      var date = new Date(item);
      var ms = date.getTime();
      return ms;
    })
  }

  this.watchStock = function(symbol){
    var req = {
      url: '/api/users/watch/' + symbol,
      method: 'POST'
    }

    return $http(req).then(function success(res) {
      var msg = symbol + ' added to Watchlist. View in Portfolio.';
      $window.alerts.push({msg: msg, type: 'success'});
      $location.path('/portfolio');
      return res;
    }, function failure(res) {
      $window.alerts.push({msg: 'Sorry, HTTP error. Please wait and try again.', type: 'danger'});
      $location.path('/');
    });
  }

  this.buyStock = function(symbol, quantity, cb){
    var dataScope = this;
    var data = {};

    this.getStockDetails([symbol], function(results){
      data.stock = results[0];
      delete data.stock['Status'];
      data.quantity = quantity;

        var req = {
          url: '/api/users/buy',
          method: 'POST',
          data: {
            data: data
          }
        }

        return $http(req).then(function success(res) {
          var msg = quantity + ' shares of ' + symbol + ' purchased. View in Portfolio.';
          $window.alerts.push({msg: msg, type: 'success'});
          $location.path('/portfolio');
          cb(res);
        }, function failure(res) {
          $window.alerts.push({msg: 'Sorry, API error. Please wait and try again.', type: 'danger'});
          $location.path('/');
        });

    })
  }

  this.getWatchlistSymbols = function(){
    var req = {
      url: '/api/users/watchlist',
      method: 'GET'
    }

    return $http(req).then(function success(res) {
      return res.data.watchlist;
    }, function failure(res) {
      $window.alerts.push({msg: 'Sorry, Database error. Please wait and try again.', type: 'danger'});
      $location.path('/');
    });
  }

  this.getPurchased = function(){
    var req = {
      url: '/api/users/purchased',
      method: 'GET'
    }

    return $http(req).then(function success(res) {
      return res.data.purchases;
    }, function failure(res) {
      $window.alerts.push({msg: 'Sorry, Database error. Please wait and try again.', type: 'danger'});
      $location.path('/');
    });
  }

  this.removeSymbolFromWatchlist = function(symbol){
    var req = {
      url: '/api/users/watch/' + symbol,
      method: 'DELETE'
    }

    return $http(req).then(function success(res) {
      var msg = symbol + ' removed from Watchlist.';
      $window.alerts.push({msg: msg, type: 'danger'});
    }, function failure(res) {
      $window.alerts.push({msg: 'Database error. Try again.', type: 'danger'});
      $location.path('/portfolio');
    });
  }

  this.removePurchase = function(purchase_Id){
    var req = {
      url: '/api/users/buy/' + purchase_Id,
      method: 'DELETE'
    }

    return $http(req).then(function success(res) {
      // var msg = symbol + ' removed from Watchlist.';
      // $window.alerts.push({msg: msg, type: 'danger'});
      console.log(res);
    }, function failure(res) {
      // $window.alerts.push({msg: 'Database error. Try again.', type: 'danger'});
      // $location.path('/portfolio');
    });
  }

  this.getNews = function(){
    var req = {
      url: '/api/news',
      method: "GET"
    };

    return $http(req).then(function success(res) {
      if (res.data.Error === "News not found!") {
        $window.alerts.push({msg: 'Error retrieving articles from news API', type: 'danger'});
        $location.path('/');
      } else {
        return res.data.articles;
      }
    }, function failure(res) {
      $scope.results = [];
      $window.alerts.push({msg: 'Error retrieving articles from news API', type: 'danger'});
      $location.path('/');
    });
  }

}

DataServices.$inject = ['$http', '$window', '$location'];
