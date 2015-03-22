require('./../domain/game');
var gameDomain = new Game();

var game = {
  player0: {userId: null, socketId: null},
  player1: {userId: null, socketId: null}
};
  
module.exports = GameSocket = function(io, socket){
  var socketRoom = "room_1";

  socket.on('game:join', function(joinRequest){
    if(game.player0.userId == null){
      game.player0.userId = joinRequest.userId;
      game.player0.socketId = socket.id;
      socket.join(socketRoom);

      io.to(socketRoom).emit("game:setPlayers", game);

      io.to(socketRoom).emit('game:status', "Waiting for another player");

    }else{
      game.player1.userId = joinRequest.userId;
      game.player1.socketId = socket.id;
      socket.join(socketRoom);

      io.to(socketRoom).emit("game:setPlayers", game);

      io.to(socketRoom).emit("game:distributeCards", gameDomain.distributeCards());
      
      io.to(game.player0.socketId).emit('game:play');
      io.to(game.player1.socketId).emit('game:wait');
    }
  });





}