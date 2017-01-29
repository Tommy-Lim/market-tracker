angular.module('App')
.component('tickerComp', {
  templateUrl: 'app/containers/ticker/ticker.html',
  controller: TickerCompCtrl,
  controllerAs: 'tickerComp',

  $scope.$watch('searchTerm', function(newVal, oldVal) {
  $scope.search();
  });

  $scope.search = function() {
    var req = {
      url: 'http://dev.markitondemand.com/MODApis/Api/v2/Quote/jsonp?symbol=' + query + '&callback=myFunction',
      method: "GET",
      params: {
        q: $scope.tickerState,
      }
    }

    $http(req).then(function success(res) {

        if (res.data.Error === "Stock not found!") {
            $scope.Symbol = [];
        } else {
          $scope.results = res.data.Symbol;
        }
      }, function failure(res) {
        $scope.results = [];
      });
    }

});
