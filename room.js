Room = function(){
  var TEAMS = [0,1];
  var MAX_PLAYERS = 2;
  this.players = array();

  addPlayer = function(pPlayer){
    var playersInRoom = this.players.length;
    if(this.players.length < MAX_PLAYERS){
      switch(playersInRoom){
        case 0:
          pPlayer.setTeam(0);
          break;
        case 1:
          pPlayer.setTeam(1);
          break;
      }

      this.players.push(pPlayer);
    }else{
      throw "maximum player exceed";
    }
  };

  removePlayer = function(pPlayer){
    var indexOfPlayer = this.players.indexOf(pPlayer);
    if(indexOfPlayer >= 0){
      this.players.splice(indexOfPlayer ,1);
    }else{
      throw "player not in room to remove";
    }
  };

};