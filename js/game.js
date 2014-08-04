var gameApp = angular.module('gameApp', []);

phonecatApp.controller('MePlayerController', function ($scope) {
  
  $scope.cards = [
    {"family": 2, "value": 6, "status": 0},
    {"family": 0, "value": 8, "status": 0},
    {"family": 3, "value": 2, "status": 0}
  ];

});