var gameApp = angular.module('gameApp', []);

gameApp.controller('GameController', function ($scope) {
  
  $scope.cards = [
    {"family": 2, "value": 6, "status": 0},
    {"family": 0, "value": 8, "status": 0},
    {"family": 3, "value": 2, "status": 0}


  ];

  $scope.players = [
  	{
  		"id": 1,
  		"cards": [
  			{"family": 0, "value": 1},
  			{"family": 0, "value": 2},
  			{"family": 0, "value": 3},
  		]
  	},
  	{
  		"id": 2,
  		"cards": [
  			{"family": 1, "value": 1},
  			{"family": 2, "value": 2},
  			{"family": 3, "value": 3},
  		]
  	},
  ];

});