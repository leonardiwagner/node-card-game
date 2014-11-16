var userName = "Anonymous" + Math.floor(Math.random() * 9999 + 1000); //window.prompt('What\'s your nickname?');
$("#anonymousNickname").html(userName);

//this need to be made at login
socket.emit('user:bindUserToSocket', userName);



var gameApp = angular.module('gameApp', []);

gameApp.controller('RoomsCtrl', function ($scope) {
  
  socket.emit('rooms:list', userName);
  socket.on('rooms:listResponse', function(roomList){
    console.log(roomList);
    $scope.rooms = roomList;
    $scope.$apply();
  });


  $scope.joinRoom = function(button){
    var roomId = $(button).parent().attr('data-room-id');

    for(var i =0; i < $scope.rooms.length; i++){
       $scope.rooms[i].status = "busy";
    }

    socket.emit('rooms:join', {
      roomId: roomId,
      user: userName
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

  socket.on('rooms:startGame', function(roomInfo){
    window.href = "/room?id=" + roomInfo.roomId;
  });

});
