var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
var router = require('./app/routes/router')(app);
//var routes = require('./app/routes/index.js')(app);

//app.use(express.static('public'));
//app.use(express.static('files'));
//app.use('/public', express.static('public'));

app.use(express.static(__dirname + "/public"));




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

/*
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