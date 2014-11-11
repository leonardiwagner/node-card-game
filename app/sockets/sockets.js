module.exports = function SocketManager(http){
  var io = require('socket.io')(http);
  var connectedSockets = 0;
  
  io.sockets.on('connection', function(socket){
    console.log(socket);
    var userSocket = require('./user')(io, socket);
    var roomSocket = require('./room')(io, socket);

    connectedSockets++;
    io.emit('socket:countUpdate', connectedSockets);

    socket.on('disconnect', function(){
      connectedSockets--;
      io.emit('socket:countUpdate', connectedSockets);

      roomSocket.disconnectUserFromRooms(socket);
    });

  });

}