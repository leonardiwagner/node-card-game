var rooms = [
  {
    roomId: 0,
    players: [{userId: null}, {userId: null}],
    status: "open"
  },
  {
    roomId: 1,
    players: [{userId: null}, {userId: null}],
    status: "open"

  },
  {
    roomId: 2,
    players: [{userId: null}, {userId: null}, {userId: null}, {userId: null}],
    status: "open"
  },
  {
    roomId: 3,
    players: [{userId: null}, {userId: null}, {userId: null}, {userId: null}],
    status: "open"
  }
];

module.exports = function RoomsSockets(io, socket, userSocket){

  function disconnectUserFromRooms(socket){
    for(var room in socket.rooms){
        io.to(room).emit('room:userDisconnected',{
          user: userId,
          chair: i
        });
      }
  }

  socket.on('rooms:join', function(joinObject){
    var roomId = joinObject.roomId;
    var userId = joinObject.userId;

    for(var i = 0; i < rooms[roomId].players.length; i++){
      if(rooms[roomId].players[i].userId === null){
        rooms[roomId].players[i].userId = userId;

        //do it in the specific room
        /*socket.join('room_' + roomId);

        io.to('room_' + roomId).emit('room:userJoined',{
          user: userId,
          chair: i
        });*/ 

        io.sockets.socket(userSocket.getSocketFromUser(userId)).emit('rooms:joined');
        return;
      }
    }

    io.emit('rooms:fullRoom');
  });

  socket.on('rooms:list', function(userId){
    console.log("room list request");
    io.sockets.socket(userSocket.getSocketFromUser(userId)).emit('rooms:listResponse', rooms);
  });

}