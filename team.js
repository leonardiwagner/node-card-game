exports.Team = function(pId){
  this.id = pId;
  this.players = Array();
  this.points = 0;

  this.addPlayer = function(pPlayer){
    this.players.push(pPlayer);
  };

  this.getPlayers = function(){
    return this.players;
  };

  this.addPoints = function(pPoints){
    this.points += pPoints;
  };

  this.getPoints = function(){
    return this.points;
  };

};
