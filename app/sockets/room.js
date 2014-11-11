var rooms = [
  {
    players: [
      {userId: null},{userId: null}
    ]
  },
  {
    players: [
      {userId: null},{userId: null},{userId: null},{userId: null}
    ]
  }
];

module.exports = function RoomSockets(io, socket){

  function disconnectUserFromRooms(socket){
    for(var room in socket.rooms){
        io.to(room).emit('room:userDisconnected',{
          user: userId,
          chair: i
        });
      }
  }

  socket.on('room:join', function(joinObject){
    var roomId = joinObject.roomId;
    var userId = joinObject.userId;

    for(var i = 0; i < rooms[roomId].players.length; i++){
      if(rooms[roomId].players[i].userId === null){
        rooms[roomId].players[i].userId = userId;

        socket.join('room_' + roomId);

        io.to('room_' + roomId).emit('room:userJoined',{
          user: userId,
          chair: i
        });

        console.log("joined room");
        return;
      }
    }

    io.emit('room:fullRoom');
    console.log("full room");
  });

}