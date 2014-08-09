var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));
app.use(express.static('files'));
app.use('/public', express.static('public'));

app.get('/', function(req, res){
  res.sendfile('game.html');
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('START_GAME', function(msg){
    console.log('message: ' + msg);
    io.emit('START_GAME_RESPONSE', "testee!");
  });

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

});

http.listen(3000, function(){


  console.log('listening on *:3000');
});