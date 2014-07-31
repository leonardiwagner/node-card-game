Team = function(pId, pPlayers){
  this.id = pId;

  var ALLOWED_PLAYERS_PER_TEAM = [2,4];

  function checkPlayers(){
    for(var i = 0; i < ALLOWED_PLAYERS_PER_TEAM; i++){

    }

    throw "Invalid amount of players to start a game!";
  }
  
  
  checkPlayers();
};