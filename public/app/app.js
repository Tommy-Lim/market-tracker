angular.module('App', ['ui.router', 'ui.bootstrap'])
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
    .state('authState', {
      url: '/auth',
      component: 'authComp'
    })
    .state('stockState', {
      url: '/stock/:symbol',
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
    .state('searchState', {
      url: '/search/:query',
      component: 'searchComp'
    })
    .state('portfolioState', {
      url: '/portfolio',
      component: 'portfolioComp'
    })

  }

]).config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
}])
