module.exports = function UserSocket(io, socket){
  var userSocketTable = [];

  function bindSocketToUser(socket, userId){
    userSocketTable[socket.id] = userId;
  }

  function unbindSocketFromUser(socket){
    delete userSocketTable[socket.id];
  }

  function getUserFromSocket(socket){
    return userSocketTable[socketId];
  }

}