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
  
  var name = window.prompt("Whats your name?");
  socket.emit('game:join', {
    roomId: 1,
    user: name
  });

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

  $scope.moveCard = function(event){
    var cardId = $(event.target).attr('data-card-id');
    socket.emit('game:move', {
      user: name,
      cardId: cardId
    });
  }

  $('* [data-chair="0"]').css('top', '75%');

  

  socket.on('game:play', function(){
    changeStatus("move");
  });

  socket.on('game:wait', function(){
    changeStatus("waiting");
  });

  socket.on('game:setPlayers', function(players){
    $scope.players = [players.player0, players.player1];
    $scope.$apply();
  });

  function changeStatus(status){
    $(".status").hide();
    $("#status ." + status).show();
  }

});