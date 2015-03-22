require('./user');
require('./rooms');
require('./game');

module.exports = function(http){
  var io = require('socket.io')(http);

  var connectedSockets = 0;
  
  io.sockets.on('connection', function(socket){
    var userSocket = new UserSocket(io, socket);
    var roomsSocket = new RoomsSocket(io, socket, userSocket);
    var gameSocket = new GameSocket(io, socket);

    //connectedSockets++;
    //io.emit('socket:countUpdate', connectedSockets);

    socket.on('disconnect', function(){
      //connectedSockets--;
      //io.emit('socket:countUpdate', connectedSockets);
      var userId = userSocket.getUserFromSocket(socket.id);
      if(userId !== undefined){
        roomsSocket.removeUserFromRoom(userId);  
        userSocket.unbindUser(socket.id);
        
      }
      
    });

  });

}