angular.module('App', ['ui.router'])
.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  function(
    $stateProvider,
    $urlRouterProvider,
    $locationProvider
  ){
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);

    $stateProvider
    .state('homeState', {
      url: '/',
      component: 'homeComp'
    })
    .state('userState', {
      url: '/user',
      component: 'userComp'
    })
    .state('stockState', {
      url: '/stock',
      component: 'stockComp'
    })
    .state('tickerState', {
      url: '/ticker',
      component: 'tickerComp'
    })
    .state('chartState', {
      url: '/chart',
      component: 'chartComp'
    })

  }

]).config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
}])
