angular.module('App')
.component('homeComp', {
  templateUrl: 'app/containers/home/home.html',
  controller: HomeCompCtrl,
  controllerAs: 'homeComp'
});

function HomeCompCtrl($interval, DataServices, AuthServices, Auth){
  var homeComp = this;

  DataServices.getNews().then(function(data){
    console.log("news data: ", data);
    homeComp.articles = data;
  });

   homeComp.quotes = ["Risk comes from not knowing what you're doing.",
   "Rule No.1: Never lose money. Rule No.2: Never forget rule No.1.",
   "In the business world, the rearview mirror is always clearer than the windshield.",
   "It takes 20 years to build a reputation and five minutes to ruin it. If you think about that, you'll do things differently.",
   "Price is what you pay. Value is what you get.",
   "Should you find yourself in a chronically leaking boat, energy devoted to changing vessels is likely to be more productive than energy devoted to patching leaks.",
   "Predicting rain doesn't count. Building arks does.",
   "The investor of today does not profit from yesterday's growth."
    ];

    function getQuote (array, $interval){
      var index = Math.floor(Math.random()*(array.length));
      homeComp.quote = array[index];
    }

    getQuote(homeComp.quotes);

    $interval(function (){
      getQuote(homeComp.quotes)
    }, 6000);

}

HomeCompCtrl.$inject = ['$interval', 'DataServices', 'AuthServices', 'Auth'];
