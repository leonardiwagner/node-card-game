
socket = io();

var gameApp = angular.module('gameApp', []);

gameApp.controller('GameController', function ($scope) {

  $scope.players = [
    {
     player: 0,
     userId: null,
     cards: []
    },
    {
      player: 1,
      userId: null,
      cards: []
    }
  ];

  socket.emit('game:join', {
    roomId: 1,
    userId: "Anonymous" + Math.floor(Math.random() * 9999 + 1000)
  });


  socket.on('game:setPlayers', function(players){
    $scope.players[0].userId = players.player0.userId;
    $scope.players[1].userId = players.player1.userId;
    $scope.$apply();
  });

  socket.on('game:status', function(status){
    console.log(status);
  });

  socket.on('game:distributeCards', function(cards){
    $scope.players[0].cards = cards.player0;
    $scope.players[1].cards = cards.player1;
    $scope.$apply();
  });

  function changeStatus(status){
    $(".status").hide();
    $("#status ." + status).show();
  }

});
