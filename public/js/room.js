"use strict";

var userName = "Anonymous" + Math.floor(Math.random() * 9999 + 1000); //window.prompt('What\'s your nickname?');
$("#anonymousNickname").html(userName);

var socket = io();
socket.emit('user:bindUserToSocket', userName);



var gameApp = angular.module('gameApp', []);
gameApp.controller('RoomCtrl', function ($scope) {
  
  socket.emit('room:join', userName);
  socket.on('rooms:joinResponse', function(roomList){
    $scope.rooms = roomList;
    $scope.$apply();
  });

  $scope.joinRoom = function(roomId){
    for(var i =0; i < $scope.rooms.length; i++){
       $scope.rooms[i].status = "busy";
    }

    socket.emit('rooms:join', {
      roomId: roomId,
      userId: userName
    });
  };

  $scope.leaveRoom = function(button){
    var roomId = $(button).parent().attr('data-room-id');

    for(var i =0; i < $scope.rooms.length; i++){
       $scope.rooms[i].status = "busy";
    }

    socket.emit('rooms:leave', {
      roomId: roomId,
      userId: userName
    });

  };

  socket.on('rooms:updateRoom', function(roomInfo){
    $scope.rooms[roomInfo.roomId].players = roomInfo.players;
    $scope.rooms[roomInfo.roomId].isOpen = roomInfo.isOpen;
  });

  socket.on('rooms:joined', function(roomId){
    //window.location = "room?id=" + roomId;
  });

  socket.on('rooms:goToRoom', function(roomId){
    window.location = "room?id=" + roomId;
  });

});
