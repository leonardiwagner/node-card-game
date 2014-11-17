var players = {
  player0: {
    user: null,
    socketId: null,
    cards:[
      {'value': 3, family: 2},
      {'value': 0, family: 1},
      {'value': 4, family: 0}
    ]
  },
  player1: {
    user: null,
    socketId: null,
    cards:[
      {'value': 3, family: 2},
      {'value': 0, family: 1},
      {'value': 4, family: 0}
    ]
  }
};
  
module.exports = function GameSockets(io, socket){
  var roomId = "ROOM_1";
  
  

  

  socket.on('game:move', function(moveRequest){
    table.push({
      card: {value: 3, family: 2},
      user: 1
    });

    if(table.length < NUMBER_OF_PLAYERS){
      //wait for next move
      io.to(roomId).emit('game:nextMove', moveRequest);
    }else{
      //check whos the winner
      var winnerUser;
      if(table[0].card.value > table[1].card.value){
        winnerUser = table[0].user;
      }else{
        winnerUser = table[1].user;
      }

      io.to(roomId).emit('game:endRound', winnerUser);
    }
   });


  socket.on('game:join', function(joinRequest){
    if(players.player0.user == null){
      players.player0.user = joinRequest.user;
      players.player0.socketId = socket.id;
      socket.join(roomId);
    }else{
      players.player1.user = joinRequest.user;
      players.player1.socketId = socket.id;
      socket.join(roomId);

      io.to(roomId).emit('game:setPlayers', players);
      
      io.to(players.player0.socketId).emit('game:play');
      io.to(players.player1.socketId).emit('game:wait');
    }
  });





}