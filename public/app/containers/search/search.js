angular.module('App')
.component('searchComp', {
  templateUrl: 'app/containers/search/search.html',
  controller: SearchCompCtrl,
  controllerAs: 'searchComp'
});

function SearchCompCtrl(DataServices){
  var searchComp = this;

  searchComp.query = "";

  this.search = function(query){
    console.log(query);
  }

}

SearchCompCtrl.$inject = ['DataServices'];
