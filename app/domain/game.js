module.exports.Game = Game = function(roomId, players){
  var NUMBER_OF_PLAYERS = 2;
  var currentPlayer = 0;

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

  var table = [];

  function move(){
    table.push({
      card: {value: 3, family: 2},
      user: 1
    });

    if(table.length < NUMBER_OF_PLAYERS){
      //wait for next move
    }else{
      //check whos the winner
      var winnerUser;
      if(table[0].card.value > table[1].card.value){
        winnerUser = table[0].user;
      }else{
        winnerUser = table[0].user;
      }
    }
  }




};