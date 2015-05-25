"use strict";

var userName = "Anonymous" + Math.floor(Math.random() * 9999 + 1000); //window.prompt('What\'s your nickname?');
$("#anonymousNickname").html(userName);

var socket = io();
socket.emit('user:bindUserToSocket', userName);



var gameApp = angular.module('gameApp', []);
gameApp.controller('RoomCtrl', function ($scope) {
  
  socket.emit('room:join', userName);
  socket.on('room:FULL_ROOM', function(){
    console.log("full room");
  });
  socket.on('room:START_GAME', function(playerCards){
    $("#player-card-1").html(playerCards[0]);
    $("#player-card-2").html(playerCards[1]);
    $("#player-card-3").html(playerCards[2]);
  });
  socket.on('room:WAITING_FOR_PLAYERS', function(){
    console.log("waiting player room");
  });
  socket.on('room:PLAYER_LEFT', function(){
    console.log("player left room");
  });

  socket.on('room:YOUR_TURN', function(){
    $("#message").html("It's your turn, choose a card to play");
  });

  socket.on('room:WAIT_PLAYER_MOVE', function(){
    $("#message").html("Wait for opponent move  ");
  });

  $(".card").click(function(){
    var value = $(this).text();
    socket.emit("room:MOVE", value);
  });



});
