'use strict';

var room = {
  'player1': null,
  'player2': null,
};

var moves = {};

module.exports = RoomSocket;
function RoomSocket(io, socket){
  function setPlayersCards(){
    room.player1.cards = ['A', 'B', 'C'];
    room.player2.cards = ['X', 'Y', 'Z'];
  }

  socket.on('room:join', function(){
    var hasAnyPlayer = room.player1 && room.player2;
    var hasPlayer1 = room.player1;
    var hasPlayer2 = room.player2;

    if(hasAnyPlayer){
      room.player1 = {"socketid": socket.id};
      io.emit('room:FULL_ROOM');
    }else{
      if(!hasPlayer1){
        room.player1 = {"socketid": socket.id};
      }else if(!hasPlayer2){
        room.player2 = {"socketid": socket.id};
      }

      if(room.player1 && room.player2){
        setPlayersCards();
        io.to(room.player1.socketid).emit('room:START_GAME', room.player1.cards);
        io.to(room.player1.socketid).emit('room:YOUR_TURN');
        io.to(room.player2.socketid).emit('room:START_GAME', room.player2.cards);
        io.to(room.player2.socketid).emit('room:WAIT_PLAYER_MOVE');
      }else{
        io.emit('room:WAITING_FOR_PLAYERS');
      }
    }
  });

  socket.on('room:MOVE', function(card) {
    moves.push({"player": 0, "card": card});

    var maxMoves = 2;
    if(moves.length === maxMoves){
      var winningCard = move[0].card;
      var winningPlayer = move[0].player;

      moves.forEach(function(move){
        if(move.card > winningCard){
          winningCard = move.card;
          winningPlayer = move.player;
        }
      });
    }
  });

  socket.on('disconnect', function(){
    if(room.player1 && room.player1.socketid === socket.id){
      room.player1 = null;
      io.emit('room:PLAYER_LEFT');
    }
    if(room.player2 && room.player2.socketid === socket.id){
      room.player2 = null;
      io.emit('room:PLAYER_LEFT');
    }
  });
  

}