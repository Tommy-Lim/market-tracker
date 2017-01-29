angular.module('App')
.component('stockComp', {
  templateUrl: 'app/containers/stock/stock.html',
  controller: StockCompCtrl,
  controllerAs: 'stockComp',

$scope.$watch('searchTerm', function(newVal, oldVal) {
$scope.search();
});

$scope.search = function() {
  var query = [];
  var req = {
    url: 'http://dev.markitondemand.com/MODApis/Api/v2/Lookup/json?input=' + query,
    method: "GET",
    params: {
      q: $scope.stockState,
    }
  }


  $http(req).then(function success(res) {

      if (res.data.Error === "Stock not found!") {
          $scope.results = [];
      } else {
        $scope.results = res.data.Symbol;
      }
    }, function failure(res) {
      $scope.results = [];
    });
  }

});
