module.exports = function UserSocketwin(io, socket){
  var userSocketTable = [];
  var socketUserTable = [];

  /*
  function bindSocketToUser(socket, userId){
    userSocketTable[socket.id] = userId;
  }

  function unbindSocketFromUser(socket){
    delete userSocketTable[socket.id];
  }
  */

  function getUserFromSocket(socket){
    return userSocketTable[socketId];
  }

  function getSocketFromUser(userId){
    return socketUserTable[userId];
  }

  socket.on('user:bindUserToSocket', function(userName){
    userSocketTable[socket.id] = userName;
    socketUserTable[userName] = socket.id;
  });

}