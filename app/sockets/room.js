'use strict';




var room = {
  'player1': null,
  'player2': null,
};

var moves = [];

var score = {
  "player1": {
    "partial": 0,
    "total": 0,
  },
  "player2": {
    "partial": 0,
    "total": 0,
  },
}

var deck =[
  {"v":0, "f": 0},
  {"v":0, "f": 1},
  {"v":0, "f": 2},
  {"v":0, "f": 3},
  {"v":1, "f": 0},
  {"v":1, "f": 1},
  {"v":1, "f": 2},
  {"v":1, "f": 3},
  {"v":2, "f": 0},
  {"v":2, "f": 1},
  {"v":2, "f": 2},
  {"v":2, "f": 3},
  {"v":3, "f": 0},
  {"v":3, "f": 1},
  {"v":3, "f": 2},
  {"v":3, "f": 3},
  {"v":4, "f": 0},
  {"v":4, "f": 1},
  {"v":4, "f": 2},
  {"v":4, "f": 3},
  {"v":5, "f": 0},
  {"v":5, "f": 1},
  {"v":5, "f": 2},
  {"v":5, "f": 3},
];

module.exports = RoomSocket;
function RoomSocket(io, socket){
  function setPlayersCards(){

    //+ Jonas Raoni Soares Silva
    //@ http://jsfromhell.com/array/shuffle [v1.0]
    var shuffleArray =function (o){ //v1.0
      for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
    }

    var shuffledDeck = shuffleArray(deck);



    room.player1.cards = shuffledDeck.splice(0 ,3);
    room.player2.cards =  shuffledDeck.splice(0 ,3);
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
        room.player1 = {"id": 1, "socketid": socket.id};
      }else if(!hasPlayer2){
        room.player2 = {"id": 2, "socketid": socket.id};
      }

      if(room.player1 && room.player2){
        startGame();
      }else{
        io.emit('room:WAITING_FOR_PLAYERS');
      }
    }
  });

  function startGame(){
    setPlayersCards();
    io.to(room.player1.socketid).emit('room:START_GAME', room.player1.cards);
    io.to(room.player1.socketid).emit('room:YOUR_TURN');
    io.to(room.player2.socketid).emit('room:START_GAME', room.player2.cards);
    io.to(room.player2.socketid).emit('room:WAIT_PLAYER_MOVE');
    moves = [];
    io.emit('room:UPDATE_SCORE', score);
  }

  socket.on('room:PLAY_CARD', function(cardId) {
    var player;
    var otherPlayer;
    if(room.player1.socketid === socket.id){
      player = room.player1;
      otherPlayer = room.player2;
    }else if(room.player2.socketid === socket.id){
      player = room.player2;
      otherPlayer = room.player1;
    }
    moves.push({"playerid": player.socketid, "card": player.cards[cardId]});

    io.to(otherPlayer.socketid).emit('room:YOUR_TURN');
    io.to(player.socketid).emit('room:WAIT_PLAYER_MOVE');




    var maxMoves = 2;
    if(moves.length === maxMoves){
      var winningCard = moves[0].card;
      var winningPlayer = moves[0].playerid;

      moves.forEach(function(move){
        if(move.card > winningCard){
          winningCard = move.card;
          winningPlayer = move.playerid;
        }
      });

      if(winningPlayer === room.player1.socketid){
        score.player1.total += 1;
      }
      if(winningPlayer === room.player2.socketid){
        score.player2.total += 1;
      }


      startGame();

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