var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
//var routes = require('./app/routes/index.js')(app);

app.use(express.static('public'));
app.use(express.static('files'));
app.use('/public', express.static('public'));



app.set('views', './app/views');
app.use(express.static('./app/public'));




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


app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.get('/room', function(req, res){
  var roomId = req.query.id;
  io.to('ROOM_' + roomId).emit("welcome to a specific room");
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
  console.log('listening on *:whatevs');
});