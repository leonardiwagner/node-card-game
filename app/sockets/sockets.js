require('./user');


module.exports = function(http){
  var io = require('socket.io')(http);

  var connectedSockets = 0;
  
  io.sockets.on('connection', function(socket){
    
    io.set('log level', false);
    
    var userSocket = new UserSocket(io, socket);
    var roomsSocket = require('./rooms')(io, socket, userSocket);
    var gameSocket = require('./game')(io, socket);

    connectedSockets++;
    io.emit('socket:countUpdate', connectedSockets);

    socket.on('disconnect', function(){
      connectedSockets--;
      io.emit('socket:countUpdate', connectedSockets);
    });

  });

}