var app = angular.module('myApp');

app.controller('listeEpicerieCtrl', 
	function($scope, $location, $rootScope, $routeParams, $timeout, $filter, toaster, 
		NgTableParams, dataSvc, authentificationSvc){
	
	$(".navbar-collapse").collapse('hide');
	$scope.dataLoaded = true;
	$scope.menu = {};

	var initData = function(){

		$scope.listePeriode = [];
		$scope.semaine = ['Lundi', 'Mardi', 'Mercredi','Jeudi', 'Vendredi'];
		$scope.finDeSemaine = ['Samedi', 'Dimanche'];

		$scope.search = {};

		$scope.listE = {
			frLe : ['Carotte', 'Patate']
		}
	}

	var index = 1;
	$scope.whereToSave = function(jour){
		console.log(jour);
		$scope.leJour = jour;
		$scope.menu[jour] = {};
	} 

	//Si on est authentifié on ne redirige pas sinon -> on redirige
	var estAuthentifier = authentificationSvc.estAuthentifier();
	
	if(!estAuthentifier){
		$location.path('/');
	} else {

		//Si on simule
		var uid = $routeParams.uid;
		if(uid){
			authentificationSvc.estAdmin().then(function(admin){
				if(admin){
					$scope.estAdmin = true;
					dataSvc.changeCredit(uid);
					initData();
				} else {
					$location.path('/espaceClient/listeFiches');
				}
			});
		} else {
			initData();
		}
	}
});