angular.module('App')
.component('userComp', {
  templateUrl: 'app/containers/user/user.html',
  controller: UserCompCtrl,
  controllerAs: 'userComp'
});

function UserCompCtrl(){
  var userComp = this;
}

UserCompCtrl.$inject = [];
