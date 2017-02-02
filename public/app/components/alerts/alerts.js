angular.module('App')
.component('alertsComp', {
  templateUrl: 'app/components/alerts/alerts.html',
  controller: AlertsCompCtrl,
  controllerAs: 'alertsComp'
});

function AlertsCompCtrl(){
  var alertsComp = this;

  alertsComp.alerts = [
    { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
    { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
  ];

  alertsComp.addAlert = function() {
    alertsComp.alerts.push({msg: 'Another alert!'});
  };

  alertsComp.closeAlert = function(index) {
    alertsComp.alerts.splice(index, 1);
  };


}

AlertsCompCtrl.$inject = [];
