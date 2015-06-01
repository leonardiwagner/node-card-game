"use strict";

var userName = "Anonymous" + Math.floor(Math.random() * 9999 + 1000); //window.prompt('What\'s your nickname?');
$("#anonymousNickname").html(userName);

var socket = io();
socket.emit('user:bindUserToSocket', userName);



var gameApp = angular.module('gameApp', []);
gameApp.controller('RoomCtrl', function ($scope) {

  var moves = [];
  var socketid;
  socket.on('room:MOVE', function(move){
    moves.push(move);

    if(moves.length === 1){

    }
  });

  socket.emit('room:join', userName);
  socket.on('room:FULL_ROOM', function(){
    console.log("full room");
  });
  socket.on('room:START_GAME', function(player){
    socketid = player.socketid;
    var playerCards = player.cards;
    $("#player-card-1").css('background-image', 'url("/img/cards/' + playerCards[0].v + '_' + playerCards[0].f + '.png")');
    $("#player-card-2").css('background-image', 'url("/img/cards/' + playerCards[1].v + '_' + playerCards[1].f + '.png")');
    $("#player-card-3").css('background-image', 'url("/img/cards/' + playerCards[2].v + '_' + playerCards[2].f + '.png")');
  });
  socket.on('room:WAITING_FOR_PLAYERS', function(){
    console.log("waiting player room");
  });
  socket.on('room:PLAYER_LEFT', function(){
    console.log("player left room");
  });
  socket.on('room:UPDATE_SCORE', function(score){
    console.log(score);
    $scope.score = score;
    //$scope.$apply;
  });

  socket.on('room:YOUR_TURN', function(){
    $("#message").html("It's your turn, choose a card to play");
  });

  socket.on('room:WAIT_PLAYER_MOVE', function(){
    $("#message").html("Wait for opponent move  ");
  });

  $scope.playCard = function(cardId){
    socket.emit("room:PLAY_CARD", cardId);
  };



});
