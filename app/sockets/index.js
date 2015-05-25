'use strict';

module.exports = Sockets;
function Sockets(http){
  var io = require('socket.io')(http);
  io.sockets.on('connection', function(socket) {
    var roomSocket = new require('./room')(io, socket);
  });


}


