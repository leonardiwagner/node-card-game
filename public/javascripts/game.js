var gameApp = angular.module('gameApp', [])
  .directive('organize-player-position', function(){
    return function(oi){
      console.log(oi);
      if(scope.$last){
        alert('Im the last!');
      }
    }
  })
;

gameApp.controller('GameController', function ($scope) {
  
  $scope.players = [
    {
      name: "<<0>"
    },
    {
      name: "<<1>>"
    }
  ];

  $scope.score = [
    {
      partial: 1,
      total: 5
    },
    {
      partial: 0,
      total: 3
    }
  ];

  $('* [data-chair="0"]').css('top', '75%');
});