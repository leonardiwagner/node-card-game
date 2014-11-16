module.exports = UserSocket = function(io, socket){

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

    this.getUserFromSocket = function(socket){
      return userSocketTable[socket];
    }

    this.getSocketFromUser = function(userId){
      return socketUserTable[userId];
    }

    socket.on('user:bindUserToSocket', function(userName){
      userSocketTable[socket.id] = userName;
      socketUserTable[userName] = socket.id;
    });

}