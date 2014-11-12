var gameApp = angular.module('gameApp', []);

gameApp.controller('RoomsCtrl', function ($scope) {
        
  $scope.rooms = [
      {
        roomId: 0,
        players: ["carl", "johnson"],
        isOpen: true
      },
      {
        roomId: 1,
        players: ["carl", "johnson"],
        isOpen: false

      },
      {
        roomId: 2,
        players: ["carl", "johnson", "ople", "jack"],
        isOpen: true
      },
      {
        roomId: 3,
        players: ["carl", "johnson", "ople", "jack"],
        isOpen: true
      }
  ];


});
