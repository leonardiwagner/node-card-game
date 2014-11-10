var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
var router = require('./app/routes/router')(app);

app.use(express.static(__dirname + "/public"));



/*
var rooms = {
  {
    id: 1,
    players: [null, null]
  },
  {
    id: 2,
    players: [null, null]
  },
};*/

//create rooms sockets

function createRoomSocket(io, roomId){
  var room = io.sockets.in("ROOM_" + roomId);

  room.on('join', function(user){
    console.log("User: " + user + " joined room: " + roomId);
  });

  room.on('leave', function(user){
    console.log("User: " + user + " joined room: " + roomId);
  });
}

createRoomSocket(io, 1);
createRoomSocket(io, 2);
createRoomSocket(io, 3);

//app.set('views', './app/views');
//app.use(express.static('./app/public'));




//express's error handler middleware
//app.use(express.errorHandler());
//app.use(app.router);

/*

mongoose.connect('mongodb://localhost/node-card-game');

var db = mongoose.connection;

db.once('open', function(){
  console.log("hurray, connected to mongodb!");
});

*/

var userSchema = mongoose.Schema({
  email: String,
  password: String
});

var User = mongoose.model('User',userSchema);
var user = new User({ email: 'teste@teste.com', password: '123'});

console.log(user.email);





var connectedUsersCount = 0;

io.sockets.on('connection', function(socket){
  console.log('a user connected');
  connectedUsersCount++;
  io.emit('UPDATE_USER_COUNT', connectedUsersCount);


  socket.on('ROOMS', function(msg){
    io.emit('ROOMS_RESPONSE', '');
  });

  socket.on('JOIN_ROOM', function(obj){
    var roomId = obj.roomId;
    var user = obj.user;

    socket.nickname = user;
    socket.join('ROOM_1');

    console.log('user joined room');
  });

  socket.on('READ_ROOM', function(roomId){
    var users = io.sockets.adapter.rooms['ROOM_1']; 

    for (var clientId in users ) {

     //this is the socket of each client in the room.
     var clientSocket = io.sockets.connected[clientId];

      console.log('>' + clientId);
    }

    io.emit('ROOM_RESPONSE', users);

   
  });

  /*
  socket.on('PLAY', function(msg){
    console.log('message: ' + msg);
     io.emit('chat message', msg);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  var  playResponse = {
    "whatToDo": "PLAYER_PLAY",
    "playerToPlay": 0
  };
  io.emit('PLAY_RESPONSE', playResponse);
  */
  socket.on('disconnect', function(){
    console.log('a user disconnected');
    connectedUsersCount--;
    io.emit('UPDATE_USER_COUNT', connectedUsersCount);
  });

});



http.listen(process.env.PORT || 5000, function(){
  console.log('listening on *:whatevs');
});