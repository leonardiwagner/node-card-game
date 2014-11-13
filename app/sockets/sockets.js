module.exports = function(http){
  var io = require('socket.io')(http);
  var connectedSockets = 0;
  
  io.sockets.on('connection', function(socket){
    var userSocket = require('./user')(io, socket);
    console.log(userSocket);
    var roomsSocket = require('./rooms')(io, socket, userSocket);

    connectedSockets++;
    io.emit('socket:countUpdate', connectedSockets);

    socket.on('disconnect', function(){
      connectedSockets--;
      io.emit('socket:countUpdate', connectedSockets);
    });

  });

};