"use strict";

var room = {
  "player1": null,
  "player2": null
}

var roomSocket = function(io, socket, userSocket){
  var that = this;
  function disconnectUserFromRooms(socket){
    for(var room in socket.rooms){
        io.to(room).emit('room:userDisconnected',{
          user: userId,
          chair: i
        });
      }
  }

  this.sendUpdateRooms = function(){
    io.sockets.emit('rooms:listResponse', rooms);
  };

  socket.on('rooms:join', function(joinObject){
    var roomId = joinObject.roomId;
    var userId = joinObject.userId;


    for(var i = 0; i < rooms[roomId].players.length; i++){
      if(rooms[roomId].players[i].userId === null){
        rooms[roomId].players[i].userId = userId;

        //do it in the specific room
        socket.join('room_' + roomId);

        io.to(userSocket.getSocketFromUser(userId)).emit('rooms:joined',roomId);

        if(underscore.every(rooms[roomId].players, function(x) { return x.userId != null;})){
          io.to('room_' + roomId).emit('rooms:goToRoom',1);
        }

        /*
        io.to('room_' + roomId).emit('room:userJoined',{
          user: userId,
          chair: i
        });*/ 

        console.log(userSocket.getSocketFromUser(userId));

        
        //socket.emit('user-typing-start', "End Typing");
        break;
      }
    }

    that.sendUpdateRooms();
  });

  socket.on('rooms:list', function(userId){
    that.sendUpdateRooms();
  });

  this.removeUserFromRoom = function(userId){
    var roomId = removeUserAndGetRoomId(userId);
    if(roomId !== undefined){
      that.sendUpdateRooms();
    }
  };

  function removeUserAndGetRoomId(userId){
    var roomId = undefined;
    underscore.each(rooms, function(room){
      for(var i =0; i < room.players.length; i ++){
        if(room.players[i].userId == userId){
          room.players[i].userId = null;
          roomId = room.roomId;
        }
      }

    });

    return roomId;
  }

  

}

module.exports.RoomSocket = roomSocket;