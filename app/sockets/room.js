"use strict";

var room = {
  "player1": null,
  "player2": null
};

var roomSocket = function(io, socket){

  socket.on('rooms:join', function(){
    if(room.player1 !== null && room.player2 !== null){
      room.player1 = socket.id;
      io.emit("FULL_ROOM");
    }else{
      if(room.player1 === null){
        room.player1 = socket.id;
      }else if(room.player2 === null){
        room.player2 = socket.id;
      }

      if(room.player1 !== null && room.player2 !== null){
        io.emit("START_GAME");
      }else{
        io.emit("WAITING_FOR_PLAYERS");
      }
    }
  });
  


};

module.exports.RoomSocket = roomSocket;