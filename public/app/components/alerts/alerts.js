angular.module('App')
.component('alertsComp', {
  templateUrl: 'app/components/alerts/alerts.html',
  controller: AlertsCompCtrl,
  controllerAs: 'alertsComp'
});

function AlertsCompCtrl($window){
  var alertsComp = this;

  //$window.alerts = [];

  alertsComp.alerts = $window.alerts;

  alertsComp.closeAlert = function(index) {
    alertsComp.alerts.splice(index, 1);
    $window.alerts = alertsComp.alerts
  };


}

AlertsCompCtrl.$inject = ['$window'];
