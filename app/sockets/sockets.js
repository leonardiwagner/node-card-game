"use strict";
require('./room');

var sockets = function(http){
  var io = require('socket.io')(http);
  io.sockets.on('connection', function(socket) {
    var roomSocket = new RoomSocket(io, socket);
  });


};

module.exports.Sockets = sockets;
