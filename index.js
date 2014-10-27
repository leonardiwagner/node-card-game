var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');

app.use(express.static('public'));
app.use(express.static('files'));
app.use('/public', express.static('public'));

mongoose.connect('mongodb://localhost/node-card-game');

var db = mongoose.connection;

db.once('open', function(){
  console.log("hurray, connected to mongodb!");
});

var userSchema = mongoose.Schema({
  email: String,
  password: String
});

var User = mongoose.model('User',userSchema);
var user = new User({ email: 'teste@teste.com', password: '123'});

console.log(user.email);

app.get('/', function(req, res){
  res.sendfile('register.html');
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

http.listen(process.env.PORT || 5000, function(){
  console.log('listening on *:whatev');
});